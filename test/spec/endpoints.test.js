/* global describe it */

var app = require('../../')
var request = require('supertest')(app)

describe('/ephemeral', function () {
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
