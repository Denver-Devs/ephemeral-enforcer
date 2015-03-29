/* global describe it */

// const _ = require('lodash-fp')
// const expect = require('chai').expect

import fixture from '../fixture/filter-fixture'
import filter from '../../src/filter'
import post from '../../src/post'

const token = 'xoxp-4015048983-4095381751-4211369118-ecfcf5'
const channel = 'C046T6XKP'

const filteredMessages = filter('1358546515.000017')('ts')(fixture.messages)

describe('/post', function () {
  it('should have better tests', function () {
    post(token, channel)(filteredMessages)
  })
})
