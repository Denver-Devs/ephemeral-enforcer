/* global describe it */

import _ from 'lodash-fp'
import {EventEmitter} from 'events'
import {expect} from 'chai'

import get from '../../src/get_history'

const token = 'xoxp-4015048983-4095381751-4211369118-ecfcf5'
const channel = 'C046T6XKP'

describe('/get_history', function () {
  it('returns an event emitter', function () {
    let got = get(token, channel, 100)

    expect(got instanceof EventEmitter).to.be.equal(true)
  })
})
