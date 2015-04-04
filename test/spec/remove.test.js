/* global describe it beforeEach afterEach */

import _ from 'lodash-fp'
import {expect} from 'chai'
import nock from 'nock'

import messages from '../fixture/remove.fixture'
import remove from '../../src/remove'

const token = 'foo'
const channel = 'bar'

const res = {
  'ok': true,
  'channel': channel,
  'ts': 'stub'
}

describe('/remove', function () {
  beforeEach(function () {
    nock('https://slack.com').post('/api/chat.delete').times(40).reply(200, res)
  })

  afterEach(function () {
    nock.cleanAll()
  })

  it('should return a partially applied function', function () {
    expect(remove(token, channel) instanceof Function).to.be.equal(true)
  })

  it('should return an array of promises when applied', function (done) {
    let removed = remove(token, channel)(messages)

    expect(removed instanceof Array).to.be.equal(true)

    Promise.all(removed).then(function (res) {
      expect(res.length).to.be.equal(10)
      done()
    })
  })
})
