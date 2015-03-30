// Enable ES6
require('babel/register')

/**
 * Require enabled tests here.
 */
require('./spec/endpoints.test')
require('./spec/filter.test')
require('./spec/post.test')
require('./spec/get_history.test')
