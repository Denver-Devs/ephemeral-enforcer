/* global describe it */

// const _ = require('lodash-fp')
// const expect = require('chai').expect

const fixture = require('../fixture/filter-fixture')
const filter = require('../../src/filter')
const post = require('../../src/post')

const filteredMessages = filter('1358546515.000017')('ts')(fixture.messages)

describe('/post', function () {
  it('should have better tests', function () {
    post('xoxp-4015048983-4095381751-4211369118-ecfcf5', 'C046T6XKP')(filteredMessages)
  })
})
