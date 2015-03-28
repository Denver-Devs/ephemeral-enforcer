'use strict'
import http from 'http'
import finalhandler from 'finalhandler'
import Router from 'router'
import commands from './src/commands'
import _ from 'lodash-fp'
import parseJson from 'body/json'
import debug from 'debug'

var error = debug('ephembot:index')
var log = debug('ephembot:index')
// Make logs go to stdout instead of stderr
log.log = console.log.bind(console)

function parseBody (req, res, next) {
  log('request:', req)
  parseJson(req, function (err, body) {
    if (err) {
      error('err:', err)
      req.body = null
      return next()
    }
    req.body = body
    next()
  })
}

var router = Router()

/**
 * This route should be given to slack as the endpoint to which to send
 * `/ephemeral` data.
 */
router.post('/ephemeral', parseBody, function (req, res) {
  log('POST /ephemeral')
  // grab the payload.
  var command = req.body || {}
  log('body', command)

  // assume failure.
  res.statusCode = 400

  // Grab the function based on command name and run it if it exists
  var run = commands[command.text]
  if (command.command === '/ephemeral' && run) {
    // everything is good, let the client know.
    res.statusCode = 200
    run(command)
  }

  // end response
  var response = run ?
    `${command.text} ran successfully.`
  : `${command.text} did not run successfully.`

  res.end(response)
})

router.all('*', function (req, res) {
  log(req.method)
  res.end('Send POST requests to /ephemeral please and thanks')
})

var app = http.createServer(function (req, res) {
  router(req, res, finalhandler(req, res))
})

export default app
