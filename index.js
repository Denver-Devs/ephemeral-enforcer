import http from 'http'
import finalhandler from 'finalhandler'
import Router from 'router'
import _ from 'lodash-fp'
import body from 'body/form'
import debug from 'debug'

var error = debug('ephembot:index')
var log = debug('ephembot:index')
// Make logs go to stdout instead of stderr
log.log = console.log.bind(console)

function parseBody (req, res, next) {
  body(req, function (err, body) {
    if (err) {
      error('err:', err)
      req.body = null
      return next()
    }
    req.body = body
    next()
  })
}

// Injected dependencies
exports = module.exports = function (commands) {
  var router = Router()

  /**
   * This route should be given to slack as the endpoint to which to send
   * `/ephemeral` data.
   */
  router.post('/ephemeral', parseBody, function (req, res) {
    log('POST /ephemeral')

    // grab the payload.
    let payload = req.body || { text: '' }
    log('body', payload)

    /**
     * grab the command function from the commands object
     */
    var run = commands[payload.text.split(' ')[0]]

    /**
     * If the command doesn't exist bail and let the client know
     */
    if (!run) {
      res.statusCode = 400
      return res.end('That command is not implemented')
    }

    /**
     * run the command function passing in the payload from slack
     */
    run(payload)
      .then(function (resp) {
        res.statusCode = 200
        res.end(resp)
      })
      .catch(function (e) {
        res.statusCode = 500
        res.end(`${e.message}\n${e.stack}`)
      })

  })

  /**
   * All other routes respond with a message to the user to use `/ephemeral`
   */
  router.all('*', function (req, res) {
    log(req.method)
    res.end('Send POST requests to /ephemeral please and thanks')
  })

  /**
   * Create the server and pass the req and res through the router
   */
  var app = http.createServer(function (req, res) {
    router(req, res, finalhandler(req, res))
  })

  return app
}
exports['@require'] = [ 'commands' ]
