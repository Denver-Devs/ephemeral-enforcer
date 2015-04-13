exports['@require'] = [ 'database', 'get_history', 'remove' ]
module.exports = exports = function start (db) {
  return function (channel) {
    return db.findOne(channel)
      .then(function (item) {
        return item.level
      })
  }
}
