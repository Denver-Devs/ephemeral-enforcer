/* global describe it */

require('babel/register')

const _ = require('lodash-fp')
const fixture = require('../fixture/filter-fixture')
const filter = require('../../src/filter')
const expect = require('chai').expect

describe('/filter', function () {
  it('returns a function', function () {
    expect(_.isFunction(filter)).to.be.equal(true)
  })

  it('should return a filtered array', function () {
    expect(filter('1358546515.000017')('ts')(fixture.messages).length).to.be.equal(12)
  })
})
