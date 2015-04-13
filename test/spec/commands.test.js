/* global describe it before */
import {expect} from 'chai'
import commands from '../../src/commands'

before(function () {
  let start = function (channel, level) {
    expect(channel, 'Missing payload.channel_id').to.be.ok
    expect(level, 'Missing payload.text').to.be.ok
    return Promise.resolve({ok: true})
  }
  let stop = function (channel) {
    expect(channel, 'Missing payload.channel_id').to.be.ok
    return Promise.resolve({ok: true})
  }
  this.cmds = commands(start, stop)
})

describe('commands', function () {
  describe('on', function () {
    it('should return a promise', function (done) {
      let payload = {
        channel_id: 'hello',
        text: '1 minute'
      }
      this.cmds.on(payload)
        .then(() => done())
        .catch(done)
    })
  })

  describe('off', function () {
    it('should return a promise', function (done) {
      let payload = {
        channel_id: 'hello'
      }
      this.cmds.off(payload)
        .then(() => done())
        .catch(done)
    })
  })

  describe('level', function () {
    it('should parse payload.text into a valid level', function (done) {
      let payload = {
        channel_id: 'hello',
        text: 'level 1 hour'
      }
      this.cmds.level(payload)
        .then((msg) => {
          expect(msg).to.match(/1 hour/)
          done()
        })
        .catch(done)
    })
  })
})
