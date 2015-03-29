import _ from 'lodash-fp'
import request from 'request-promise'

const postList = _.curry(function (token, channel) {
  return _.each(message => deleteMessage(token, channel, message))
})

const deleteMessage = function (token, channel, message) {
  request.get('https://slack.com/api/chat.delete?token=' + token + '&ts=' + message.ts + '&channel=' + channel)
}

export default postList
