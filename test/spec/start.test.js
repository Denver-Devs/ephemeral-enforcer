/* global describe it before */
import {expect} from 'chai'
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
  this.db = database()
  this.start = st(this.db, get, remove)
})

describe('start', function () {
  it('should start ephembot', function (done) {
    let level = {num: 2, unit: 'minutes'}
    let id = 'sup'
    this.start(id, level)
      .then(function (data) {
        expect(data.ok).to.be.ok
      })
      .then(() => {
        return this.db.findOne(id)
      })
      .then(function (data) {
        expect(data._id).to.be.equal(id)
        expect(data.level).to.be.deep.equal(level)
        expect(data.proc.ontimeout).to.be.ok
        done()
      })
      .catch(done)
  })
})
