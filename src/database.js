import _ from 'lodash-fp'

module.exports = exports = function database () {
  /**
   *
   */
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
      if (!data) return null
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
      return Promise.resolve(x)
    }
  }
}
