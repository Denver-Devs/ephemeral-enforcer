import _ from 'lodash-fp'

module.exports = exports = function database () {
  let store = {}

  return {
    findOne (id) {
      let data = _.clone(store[id], true)
      if (data) data._id = id
      return Promise.resolve(data)
    },

    put (x) {
      let data = _.clone(x, true)
      let id = data._id
      delete data._id

      if (!id) return Promise.reject('database.put requires _id field')

      store[id] = data
      return Promise.resolve(x)
    }
  }
}
