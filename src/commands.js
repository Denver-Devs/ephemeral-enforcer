import database from './database'
import getHistory from './get_history'
import remove from './remove'
import config from 'config'

import debug from 'debug'
var error = debug('ephembot:commands')
var log = debug('ephembot:commands')

// 15 minutes is the default
const defaultLevel = 15

const minutes = function (m) {
  return m * 60 * 1000
}

export default {
  'on': function (cmd) {
    log('on', cmd.channel_id)
    let del = remove(config.get('slack_token'), cmd.channel_id)

    let intervalFn = function () {
      log(cmd.channel_id, 'deleting messages.')
      getHistory({
        token: config.get('slack_token'),
        channel: cmd.channel_id,
        latest: Date.now() - minutes(defaultLevel)
      })
        .then(del)
        .catch(error)
    }
    intervalFn()
    database[cmd.channel_id] = setInterval(intervalFn, minutes(defaultLevel))

    return `Ephemeral on: ${defaultLevel} minutes`
  },
  'off': function (cmd) {
    log('off', cmd.channel_id)
    clearInterval(database[cmd.channel_id])
    delete database[cmd.channel_id]

    return `Ephemeral off`
  },
  'level': function (cmd) {
    return 'level is not yet implemented.'
  },
  'clean': function (cmd) {
    return 'clean is not yet implemented.'
  }
}
