/* global describe it before after beforeEach afterEach */

import {expect} from 'chai'
import fixtures from '../fixture/get_history.fixture'
import nock from 'nock'
import path from 'path'

import IoC from 'electrolyte'
IoC.loader(IoC.node(path.resolve(__dirname, '../../')))
IoC.loader(IoC.node(path.resolve(__dirname, '../../src')))

const app = IoC.create('index')
const db = IoC.create('database')

const CHANNEL_ID = 'UIJF3243'
const res = {
  'ok': true,
  'channel': CHANNEL_ID,
  'ts': 'stub'
}

let request = require('supertest')(app)

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

describe('Integration', function () {
  describe('POST /ephemeral', function () {
    beforeEach(function () {
      nock('https://slack.com')
        .filteringPath(/latest=[^&]*/g, 'latest=XXX')
        .get(`/api/channel.history?token=&channel_id=${CHANNEL_ID}&latest=XXX`)
        .reply(200, fixtures[0])

        .post('/api/chat.delete').times(40).reply(200, res)
    })
    it('should turn ephembot on when told', function (done) {
      let body = `text=on&channel_id=${CHANNEL_ID}`
      request
        .post('/ephemeral')
        .send(body)
        .expect(200, function (err) {
          if (err) return done(err)
          db.findOne(CHANNEL_ID).then(function (data) {
            expect(data).to.be.ok
            done(err)
          })
        })
    })
    it('should respond 400 to unsupported commands', function (done) {
      let body = `text=butts&channel_id=${CHANNEL_ID}`
      request
        .post('/ephemeral')
        .send(body)
        .expect(400, done)
    })
  })
})
