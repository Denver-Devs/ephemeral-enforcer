import _ from 'lodash-fp'

import debug from 'debug'
// let error = debug('ephembot:database')
let log = debug('ephembot:database')
// Make logs go to stdout instead of stderr
log.log = console.log.bind(console)


exports = module.exports = function database () {
  let store = {}

  return {
    /**
     * Finds an item in the database by id
     *
     * @param {string} - the id of the desired object
     * @return {object|null} - the found object, or null
     */
    findOne (id) {
      let data = _.clone(store[id], true)
      log('findOne', data, 'channel:', id)
      if (!data) return Promise.resolve(null)
      data._id = id
      return Promise.resolve(data)
    },

    /**
     * Puts an item in the database. The put item MUST have an _id field
     *
     * @param {object} - the id of the desired object
     * @return {object} - the found object, or null
     */
    put (x) {
      let data = _.clone(x, true)
      let id = data._id
      delete data._id

      if (!id) return Promise.reject('database.put requires _id field')

      store[id] = data
      log('channel:', id, 'data:', store[id])
      return Promise.resolve(x)
    }
  }
}
exports['@singleton'] = true
