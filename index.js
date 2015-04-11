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

module.exports = exports = function (commands) {

  var router = Router()

  /**
   * This route should be given to slack as the endpoint to which to send
   * `/ephemeral` data.
   */
  router.post('/ephemeral', parseBody, function (req, res) {
    log('POST /ephemeral')
    // grab the payload.
    let command = req.body || {}
    let resp = 'An error occured.'
    log('body', command)

    // assume failure.
    res.statusCode = 400

    // Grab the function based on command name and run it if it exists
    // the function name is the command name which should be the first word
    // in after /ephemeral
    error(command.text.split(' ')[0])
    var run = commands[command.text.split(' ')[0]]
    if (command.command === '/ephemeral' && run) {
      // everything is good, let the client know.
      res.statusCode = 200
      resp = run(command)
    }

    res.end(resp)
  })

  router.all('*', function (req, res) {
    log(req.method)
    res.end('Send POST requests to /ephemeral please and thanks')
  })

  var app = http.createServer(function (req, res) {
    router(req, res, finalhandler(req, res))
  })

  return app
}

exports['@require'] = [
  'commands'
]
