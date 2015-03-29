import _ from 'lodash-fp'
import request from 'request-promise'
import {EventEmitter} from 'events'

const vent = new EventEmitter()

const success = function(res) {
  let payload = JSON.parse(res)
  let messages = _.clone(payload.messages)
  let hasMore = payload.has_more

  vent.emit('done', messages, hasMore)
}

const failure = function(err) {
  vent.emit('fail', err)
}

const getHistory = function (token, channel, count) {
  let url = `https://slack.com/api/channels.history?token=${token}&channel=${channel}&count=${count}`

  request(url).then(success).catch(failure)

  return vent
}

export default getHistory
