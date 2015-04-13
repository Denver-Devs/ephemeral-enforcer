// Enable ES6
require('babel/register')

/**
 * Require enabled tests here.
 */
require('./spec/endpoints.test')
require('./spec/get_history.test')
require('./spec/remove.test')
require('./spec/database.test')
require('./spec/start.test') // depends on database.test
require('./spec/stop.test') // depends on start.test
require('./spec/stat.test') // depends on start.test
require('./spec/commands.test')
