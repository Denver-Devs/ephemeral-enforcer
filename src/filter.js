var _ = require('lodash-fp')

module.exports = function (cursor) {
  return function (lookingFor) {
    return _.filter(function (message) {
      return message[lookingFor] <= cursor
    })
  }
}
