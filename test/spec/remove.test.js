/* global describe it beforeEach afterEach */

import _ from 'lodash-fp'
import {expect} from 'chai'
import nock from 'nock'

import messages from '../fixture/remove.fixture'
import rem from '../../src/remove'
const remove = rem()

const token = 'foo'
const channel = 'bar'

const res = {
  'ok': true,
  'channel': channel,
  'ts': 'stub'
}

const rej = {
  'ok': false
}

describe('remove', function () {
  beforeEach(function () {
    nock('https://slack.com').post('/api/chat.delete').times(40).reply(200, res)
  })

  afterEach(function () {
    nock.cleanAll()
  })

  it('should return a partially applied function', function () {
    expect(remove(token, channel) instanceof Function).to.be.equal(true)
  })

  it('should return a promises when applied', function (done) {
    let removed = remove(token, channel)(messages)

    expect(removed instanceof Promise).to.be.equal(true)
    done()
  })

  it('should return a promise that, when fmapped, contain an array', function (done) {
    let removed = remove(token, channel)(messages)

    removed.then(function (messages) {
      expect(messages instanceof Array).to.be.equal(true)
      expect(messages.length).to.be.equal(10)
    })

    done()
  })
})

describe('/remove catch', function () {
  beforeEach(function () {
    nock('https://slack.com').post('/api/chat.delete').times(40).reply(200, rej)
  })

  afterEach(function () {
    nock.cleanAll()
  })

  it('should return a promise that catches', function (done) {
    let removed = remove(token, channel)(messages)

    removed
      .then(() => console.log('fail: this should\'nt be reachable'))
      .catch(() => done())
  })
})
