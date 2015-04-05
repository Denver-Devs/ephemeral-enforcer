/* global describe it before after beforeEach afterEach */

var app = require('../../')
var request = require('supertest')(app)
var nock = require('nock')

let res = {
  ok: true,
  has_more: false,
  messages: []
}

describe('/ephemeral', function () {
  before(function () {
    // nock.recorder.rec()
    nock.enableNetConnect(/^.*127\.0\.0\.1.*$/)

  })

  beforeEach(function () {
    nock('https://slack.com')
      .filteringPath(function (path) {
        return path.match(/\/api\/channels.history/)
      })
      .get('/api/channels.history').times(1).reply(200, res)
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
