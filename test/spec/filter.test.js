/* global describe it */

import _ from 'lodash-fp'
import {expect} from 'chai'

import fixture from '../fixture/history'
import filter from '../../src/filter'

describe('/filter', function () {
  it('returns a function', function () {
    expect(_.isFunction(filter)).to.be.equal(true)
  })

  it('when called, returns a filtered array', function () {
    expect(filter('1358546515.000017')('ts')(fixture.messages).length).to.be.equal(12)
  })
})
