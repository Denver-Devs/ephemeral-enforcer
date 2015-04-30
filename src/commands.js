import _ from 'lodash-fp'
import debug from 'debug'

// let error = debug('ephembot:commands')
let log = debug('ephembot:commands')
// Make logs go to stdout instead of stderr
log.log = console.log.bind(console)

// Injected dependencies
exports = module.exports = function commandsModule (start, stop, stat) {
  return {

    /**
     * Turns ephembot on with the default level of 15 minutes
     *
     * @return promise
     * @example
     *   /ephembot on
     */
    'on': function (cmd) {
      log('on', cmd.channel_id)

      return start(cmd.channel_id, {num: 15, unit: 'minutes'})
        .then(function () {
          return 'Ephemeral level set to 15 minutes'
        })
    },

    /**
     * Turns ephembot on with the provided level
     *
     * @example
     *   /ephembot level 10 hours
     */
    'level': function (cmd) {
      let num = Number(cmd.text.split(' ')[1])
      let unit = cmd.text.split(' ')[2]

      let level = {num, unit}
      log('level', level)

      if (_.isNaN(level)) {
        return Promise.reject(new Error('Invalid level'))
      }

      return start(cmd.channel_id, level)
        .then(function () {
          return 'Ephemeral level set to ' + level.num + ' ' + level.unit
        })
    },

    /**
     * Turns ephembot off
     *
     * @example
     *   /ephembot off
     */
    'off': function (cmd) {
      log('off', cmd.channel_id)

      return stop(cmd.channel_id)
        .then(function () {
          return `Ephembot has been turned off`
        })
    },

    /**
     * Returns the current level
     *
     * @example
     *   /ephembot status
     */
    'status': function (cmd) {
      log('status', cmd.channel_id)

      return stat(cmd.channel_id)
        .then(function (level) {
          return `Level: {level.num} {level.unit}`
        })
    }
  }
}
exports['@require'] = ['start', 'stop', 'stat']
