/* global before describe it */
import {expect} from 'chai'
import database from '../../src/database'

before(function () {
  this.data = {
    _id: 'butts',
    talon: 'is cool'
  }
  this.db = database()
})

describe('database', function () {
  describe('#put', function () {
    it('should put an object', function (done) {
      var result = this.db.put(this.data)
      expect(result instanceof Promise, 'db.put should return a promise')
      result
        .then((x) => {
          expect(x).to.be.deep.equal(this.data)
          done()
        })
        .catch(done)
    })
  })

  describe('#findOne', function () {
    it('should find an object by id', function (done) {
      var result = this.db.findOne('butts')
      result
        .then((x) => {
          expect(x).to.be.deep.equal(this.data)
          done()
        })
        .catch(done)
    })

  })
})
