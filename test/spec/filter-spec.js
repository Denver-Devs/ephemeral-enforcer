var _ = require('lodash-fp')
var fixture = require('../fixture/filter-fixture')
var should = require('chai').should()
var filter = require('../../src/filter')


describe('filter', function() {

    it('returns a function', function() {
        _.isFunction(filter).should.equal(true)
    })

    it('should return a filtered array', function() {
        filter('1358546515.000017')('ts')(fixture.messages).length.should.equal(12)
    })

})

