/* global describe it */

const _ = require('lodash-fp')
const expect = require('chai').expect

const fixture = require('../fixture/filter-fixture')
const filter = require('../../src/filter')

describe('/filter', function () {
  it('returns a function', function () {
    expect(_.isFunction(filter)).to.be.equal(true)
  })

  it('should return a filtered array', function () {
    expect(filter('1358546515.000017')('ts')(fixture.messages).length).to.be.equal(12)
  })
})
