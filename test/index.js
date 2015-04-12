// Enable ES6
require('babel/register')

/**
 * Require enabled tests here.
 */
require('./spec/endpoints.test')
require('./spec/get_history.test')
require('./spec/remove.test')
require('./spec/database.test')
