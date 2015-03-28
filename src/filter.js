import _ from 'lodash-fp'

const filterByCursor = function (cursor) {
  return function (lookingFor) {
    return _.filter(message => message[lookingFor] <= cursor)
  }
}

export default filterByCursor
