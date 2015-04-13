import config from 'config'
import moment from 'moment'

import debug from 'debug'
let error = debug('ephembot:commands')
let log = debug('ephembot:commands')
// Make logs go to stdout instead of stderr
log.log = console.log.bind(console)

// Injected dependencies
exports['@require'] = [ 'database', 'get_history', 'remove' ]
module.exports = exports = function start (db, get, remove) {
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
    /**
     * Composes `get_history` and `remove` to remove the messages that
     * are older than `level`
     *
     * @return {promise}
     */
    let go = function () {
      return get({
        token: config.get('slack_token'),
        channel: chan,
        latest: moment().subtract(level.num, level.unit).unix()
      })
        .then(remove(config.get('slack_token'))(chan))
        .catch(error)
    }

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
