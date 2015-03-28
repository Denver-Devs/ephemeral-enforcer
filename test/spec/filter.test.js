/* global describe it */

var _ = require('lodash-fp')
var fixture = require('../fixture/filter-fixture')
var filter = require('../../src/filter')
var expect = require('chai').expect

describe('filter', function () {
  it('returns a function', function () {
    expect(_.isFunction(filter)).to.be.equal(true)
  })

  it('should return a filtered array', function () {
    expect(filter('1358546515.000017')('ts')(fixture.messages).length).to.be.equal(12)
  })
})
