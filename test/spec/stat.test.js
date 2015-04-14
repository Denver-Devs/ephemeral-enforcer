/* global describe it before */
import {expect} from 'chai'
import st from '../../src/start'
import stat from '../../src/stat'
import database from '../../src/database'

before(function () {
  let get = function () {
    return Promise.resolve({ok: true})
  }
  let remove = function () {
    return function () {
      return Promise.resolve({ok: true})
    }
  }
  this.level = {num: 2, unit: 'minutes'}
  this.id = 'sup'
  this.db = database()

  let start = st(this.db, get, remove, this.level)

  start(this.id, this.level)

  this.stat = stat(this.db)
})

describe('stat', function () {
  it('should return the current level', function (done) {
    this.stat(this.id)
      .then(level => {
        expect(level).to.be.equal(this.level)
        done()
      })
      .catch(done)
  })
})
