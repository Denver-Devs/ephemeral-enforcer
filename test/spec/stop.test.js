/* global describe it before */
import {expect} from 'chai'
import sto from '../../src/stop'
import st from '../../src/start'
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
  let level = {num: 2, unit: 'minutes'}
  this.id = 'sup'
  this.db = database()

  let start = st(this.db, get, remove, level)

  start(this.id, level)

  this.stop = sto(this.db)
})

describe('stop', function () {
  it('should stop ephembot', function (done) {
    this.stop(this.id)
      .then(data => {
        expect(data.proc.ontimeout).to.be.not.ok
        expect(data._id).to.be.equal(this.id)
        done()
      })
      .catch(done)
  })
})
