// Injected dependencies
exports = module.exports = function stop (db) {
  /**
   * Stops the interval set on a channel
   *
   * @param {string} - slack channel id
   * @return {promise}
   */
  return function (channel) {
    return db.findOne(channel)
      .then(function (item) {
        if (!item) return false
        clearInterval(item.proc)
        return item
      })
  }
}
exports['@require'] = [ 'database' ]
