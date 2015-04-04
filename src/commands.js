import database from './database'
import getHistory from './get_history'
import remove from './remove'
import config from 'config'
import _ from 'lodash-fp'

import debug from 'debug'
var error = debug('ephembot:commands')
var log = debug('ephembot:commands')
// Make logs go to stdout instead of stderr
log.log = console.log.bind(console)

// 15 minutes is the default
const defaultLevel = 15

const minutes = function (m) {
  return m * 60 * 1000
}

const intervalFn = function (chan, min) {
  let del = remove(config.get('slack_token'), chan)
  return function () {
    log(chan, 'deleting messages.')
    getHistory({
      token: config.get('slack_token'),
      channel: chan,
      latest: Date.now() - minutes(min)
    })
      .then(del)
      .catch(error)
  }
}

export default {
  'on': function (cmd) {
    log('on', cmd.channel_id)

    database[cmd.channel_id] = setInterval(
        intervalFn(cmd.channel_id, defaultLevel), minutes(defaultLevel))

    return `Ephemeral on: ${defaultLevel} minutes`
  },
  'off': function (cmd) {
    log('off', cmd.channel_id)
    clearInterval(database[cmd.channel_id])
    delete database[cmd.channel_id]

    return `Ephemeral off`
  },
  'level': function (cmd) {
    let mins = Number(cmd.text)

    if (_.isNaN(mins)) return 'level must be the number of minutes'

    log('level', mins)
    clearInterval(database[cmd.channel_id])
    database[cmd.channel_id] = setInterval(
        intervalFn(cmd.channel_id, mins), minutes(mins))

    return 'level set to ' + cmd.text
  },
  'clean': function (cmd) {
    // cmd.token
    // cmd.channel_id
    // channel_id=C2147483705
    // token=gIkuvaNzQIHg97ATvDxqgjtO
    return 'clean is not yet implemented.'
  }
}
