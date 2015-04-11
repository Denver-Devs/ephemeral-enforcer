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
    let command = req.body || { text: '' }
    log('body', command)

    var run = commands[command.text.split(' ')[0]]
    if (!run) {
      res.statusCode = 400
      res.end('That command is not implemented')
    }

    run(command)
      .then(function (resp) {
        res.statusCode = 200
        res.end(resp)
      })
      .catch(function (e) {
        res.statusCode = 500
        res.end(e.message)
      })

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
