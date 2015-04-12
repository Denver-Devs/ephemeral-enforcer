import _ from 'lodash-fp'
import debug from 'debug'

// let error = debug('ephembot:commands')
let log = debug('ephembot:commands')
// Make logs go to stdout instead of stderr
log.log = console.log.bind(console)

module.exports = exports = function commandsModule (start, stop) {
  return {

    'on': function (cmd) {
      log('on', cmd.channel_id)

      return start(cmd.channel_id, {num: 15, unit: 'minutes'})
        .then(function () {
          return 'Ephemeral level set to 15 minutes'
        })
    },

    'level': function (cmd) {
      let level = Number(cmd.text.split(' ')[1])

      if (_.isNaN(level)) {
        return Promise.reject('Invalid level')
      }

      return start(cmd.channel_id, {num: level, unit: 'minutes'})
        .then(function () {
          return `Ephemeral level set to {level} minutes`
        })
    },

    'off': function (cmd) {
      log('off', cmd.channel_id)

      return stop(cmd.channel_id)
        .then(function () {
          return `Ephembot has been turned off`
        })
    }
  }
}

exports['@require'] = [
  'start'
]
