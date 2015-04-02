/* global describe it */

import _ from 'lodash-fp'
import {expect} from 'chai'

import get from '../../src/get_history'

const token = 'xoxp-4015048983-4095381751-4211369118-ecfcf5'
const channel = 'C046T6XKP'

const opts = {
  token: token,
  channel: channel,
  count: 100,
  head: Date.now()
}

describe('/get_history', function () {
  it('should use a mock for tests :)', function () {

  })

  it('returns a promise', function (done) {
    let got = get(opts)

    got.then(() => done())

    expect(got instanceof Promise).to.be.equal(true)
  })
})
