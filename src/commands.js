import database from './database'
import getHistory from './get_history'
import remove from './remove'
import config from 'config'
import _ from 'lodash-fp'
import moment from 'moment'

import debug from 'debug'

let error = debug('ephembot:commands')
let log = debug('ephembot:commands')
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
    let latest = moment().subtract(min, 'minutes').unix()
    log(chan, 'deleting messages older than', latest)

    return getHistory({
      token: config.get('slack_token'),
      channel: chan,
      latest: latest
    })
      .then(del)
      .catch(error)
  }
}

export default {
  'on': function (cmd) {
    log('on', cmd.channel_id)

    // Run right away
    let go = intervalFn(cmd.channel_id, defaultLevel)
    go()
    // Then run at an interval
    database[cmd.channel_id] = setInterval(go, minutes(defaultLevel))

    return `Ephemeral on: ${defaultLevel} minutes`
  },
  'off': function (cmd) {
    log('off', cmd.channel_id)
    clearInterval(database[cmd.channel_id])
    delete database[cmd.channel_id]

    return `Ephemeral off`
  },
  'level': function (cmd) {
    let mins = Number(cmd.text.split(' ')[1])

    if (_.isNaN(mins)) {
      error('Incorrect minute value', mins)
      error('cmd.text', cmd.text)
      return 'level must be the number of minutes'
    }

    log('level', mins)
    clearInterval(database[cmd.channel_id])
    let go = intervalFn(cmd.channel_id, defaultLevel)
    go()
    database[cmd.channel_id] = setInterval(go, minutes(mins))

    return 'level set to ' + cmd.text
  },
  'clean': function (cmd) {
    return 'clean is not yet implemented.'
  }
}
