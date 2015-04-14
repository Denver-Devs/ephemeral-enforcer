// Injected dependencies
exports['@require'] = [ 'database', 'get_history', 'remove' ]
module.exports = exports = function start (db) {
  /**
   * Returns the given channels current level
   *
   * @param {string}
   * @return {object}
   */
  return function (channel) {
    return db.findOne(channel)
      .then(function (item) {
        if (!item) return null
        return item.level
      })
  }
}
