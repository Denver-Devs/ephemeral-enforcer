import config from 'config'
import moment from 'moment'

import debug from 'debug'
// let error = debug('ephembot:start')
let log = debug('ephembot:start')
// Make logs go to stdout instead of stderr
log.log = console.log.bind(console)

// Injected dependencies
exports = module.exports = function start (db, get, remove) {
  /**
   * starts ephembot
   *
   * @param {string} - slack channel id
   * @param {object} - `level`
   * @return {promise}
   */
  return function start (chan, level) {
    let interv = moment.duration(level.num, level.unit)
      .asMilliseconds()
    if (interv <= 0) {
      return Promise.reject(new Error(`
        Invalid level.\n
        Please provide a number and unit that follows the \`moment\` API.
      `))
    }
    /**
     * Composes `get_history` and `remove` to remove the messages that
     * are older than `level`
     *
     * @return {promise}
     */
    let go = function () {
      let hist = get({
        token: config.get('slack_token'),
        channel: chan,
        latest: moment().subtract(level.num, level.unit).unix()
      })
      return remove(config.get('slack_token'))(chan)(hist)
    }

    /**
     * clear previously set levels
     */
    db.findOne(chan).then(function (item) {
      if (item) {
        clearInterval(item.proc)
      }
    })

    /**
     * Save the interval id (`proc`) and `level`
     */
    return db.put({
      _id: chan,
      level: level,
      proc: setInterval(go, interv) // Execute `go` every `interv`
    })
    .then(go) // After db operations are successful `go` right now.
  }
}
exports['@require'] = [ 'database', 'get_history', 'remove' ]
