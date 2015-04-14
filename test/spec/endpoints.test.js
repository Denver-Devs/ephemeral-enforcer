/* global describe it before after afterEach */

var app = require('../../')
var nock = require('nock')

/**
 * Mock the commands because all we are testing is that they get run.
 */
let commands = {
  'on': function commandOn () {
    return Promise.resolve('On ran.')
  },
  'off': function commandOff () {
    return Promise.resolve('Off ran.')
  },
  'level': function commandLevel () {
    return Promise.resolve('level ran')
  }
}
var request = require('supertest')(app(commands))

describe('POST /ephemeral', function () {
  before(function () {
    // nock.recorder.rec()
    nock.enableNetConnect(/^.*127\.0\.0\.1.*$/)

  })

  after(function () {
    // nock.recorder.play()
    nock.disableNetConnect(/^.*127\.0\.0\.1.*$/)
  })

  afterEach(function () {
    nock.cleanAll()
  })

  it('should respond 200 to supported commands', function (done) {
    var body = `command=/ephemeral&text=on`
    request
      .post('/ephemeral')
      .send(body)
      .expect(200, done)
  })

  it('should respond 400 to unsupported commands', function (done) {
    var body = `command=/ephemeral&text=butts`
    request
      .post('/ephemeral')
      .send(body)
      .expect(400, done)
  })
})
