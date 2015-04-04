/* global describe it beforeEach afterEach */

import _ from 'lodash-fp'
import {expect} from 'chai'
import nock from 'nock'

import fixture from '../fixture/get_history.fixture'
import get from '../../src/get_history'

const opts = {
  token: 'foo',
  channel: 'bar',
  count: 10,
  latest: 'now'
}

const first = '/api/channels.history?token=foo&channel=bar&count=10&latest=now'
const firstRes = fixture[0]

const second = '/api/channels.history?token=foo&channel=bar&count=10&latest=1358546515.000011'
const secondRes = fixture[1]

describe('/get_history', function () {
  beforeEach(function () {
    nock('https://slack.com').get(first).times(1).reply(200, firstRes)
    nock('https://slack.com').get(second).times(1).reply(200, secondRes)
  })

  afterEach(function () {
    nock.cleanAll()
  })

  it('should return a promise', function (done) {
    let got = get(opts)

    expect(got instanceof Promise).to.be.equal(true)

    got.then((res) => done())
  })

  it('should unwrap into an array', function (done) {
    let got = get(opts)

    got.then(function (res) {
      expect(res instanceof Array).to.be.equal(true)
      done()
    })
  })

  it('should chain promises until end condition is met', function (done) {
    let got = get(opts)

    got.then(function (res) {
      expect(res.length).to.be.equal(20)
      done()
    })
  })
})
