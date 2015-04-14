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
        expect(data.ok, 'Start should have triggered get and remove').to.be.ok
      })
      .then(() => {
        return this.db.findOne(id)
      })
      .then(function (data) {
        expect(data._id, 'The _id should have been saved').to.be.equal(id)
        expect(data.level, 'The level should have been saved').to.be.deep.equal(level)
        expect(data.proc, 'A timeout should have been saved').to.be.an('object')
        done()
      })
      .catch(done)
  })

  it('should fail on invalid levels', function (done) {
    let level = {num: 2, unit: 'butts'}
    let id = 'sup'
    this.start(id, level)
      .then(function (data) {
        done(new Error('then should not be called'))
      })
      .catch(function (e) {
        expect(e instanceof Error).to.be.ok
        done()
      })
  })
})
