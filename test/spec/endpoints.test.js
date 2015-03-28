/* global describe it */

require('babel/register')

var app = require('../../')
var request = require('supertest')(app)

describe('/ephemeral', function () {
  it('should respond 200 to supported commands', function (done) {
    request
      .post('/ephemeral')
      // .set('Content-Type', 'application/json')
      // .set('Accept', 'application/json')
      .send({command: '/ephemeral', text: 'on'})
      .expect(200, done)
  })

  it('should respond 400 to unsupported commands', function (done) {
    request
      .post('/ephemeral')
      // .set('Content-Type', 'application/json')
      // .set('Accept', 'application/json')
      .send({command: '/ephemeral', text: 'butts'})
      .expect(400, done)
  })
})
