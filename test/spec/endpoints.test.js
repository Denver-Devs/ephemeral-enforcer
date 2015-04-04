/* global describe it before after */

var app = require('../../')
var request = require('supertest')(app)
var nock = require('nock')

let res = {
  ok: true,
  has_more: false,
  messages: []
}

// nock('https://slack.com').post('/api/chat.delete').times(1).reply(200, res)
nock('https://slack.com')
  .filteringPath(function (path) {
    return path.match(/\/api\/channels.history/)
  })
  .get('/api/channels.history').times(1).reply(200, res)

describe('/ephemeral', function () {
  before(() => nock.enableNetConnect('127.0.0.1'))
  after(() => nock.disableNetConnect('127.0.0.1'))

  it('should respond 200 to supported commands', function (done) {
    var body = `command=/ephemeral&text=on`
    request
      .post('/ephemeral')
      // .set('Content-Type', 'application/json')
      // .set('Accept', 'application/json')
      .send(body)
      .expect(200, done)
  })

  it('should respond 400 to unsupported commands', function (done) {
    var body = `command=/ephemeral&text=butts`
    request
      .post('/ephemeral')
      // .set('Content-Type', 'application/json')
      // .set('Accept', 'application/json')
      .send(body)
      .expect(400, done)
  })
})
