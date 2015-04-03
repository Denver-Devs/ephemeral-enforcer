import database from './database'
import getHistory from './get_history'
import remove from './remove'

import debug from 'debug'
var error = debug('ephembot:commands')
var log = debug('ephembot:commands')

// 15 minutes is the default
const defaultLevel = 15

// talon - Denver-Devs:
const token = 'xoxp-4015048983-4025456865-4309485153-f20f9c'

const minutes = function (m) {
  return m * 60 * 1000
}

export default {
  'on': function (cmd) {
    log('on', cmd.channel_id)
    let del = remove(token, cmd.channel_id)

    database[cmd.channel_id] = setInterval(function () {
      log(cmd.channel_id, 'deleting messages.')
      getHistory({
        token: token,
        channel: cmd.channel_id,
        latest: Date.now() - minutes(defaultLevel)
      })
        .then(del)
        .catch(error)
    }, minutes(defaultLevel))

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
    // cmd.token
    // cmd.channel_id
    // channel_id=C2147483705
    // token=gIkuvaNzQIHg97ATvDxqgjtO
    return 'clean is not yet implemented.'
  }
}
