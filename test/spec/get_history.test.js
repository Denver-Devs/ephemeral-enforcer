/* global describe it */

import _ from 'lodash-fp'
import {expect} from 'chai'
import nock from 'nock'

import {messages} from '../fixture/history'
import get from '../../src/get_history'

const opts = {
  token: 'foo',
  channel: 'bar',
  count: 10,
  latest: 1358546515
}

let first = '/api/channels.history?token=foo&channel=bar&count=10&latest=1358546515'
let firstRes = {
  ok: true,
  has_more: true,
  messages: messages.slice(0, 10)
}

let second = '/api/channels.history?token=foo&channel=bar&count=10&latest=1358546515.000011'
let secondRes = {
  ok: true,
  has_more: false,
  messages: messages.slice(10)
}

nock('https://slack.com').get(first).times(4).reply(200, firstRes)
nock('https://slack.com').get(second).times(4).reply(200, secondRes)

describe('/get_history', function () {
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
