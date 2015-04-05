import _ from 'lodash-fp'
import querystring from 'querystring'
import https from 'https'
import debug from 'debug'

const log = debug('ephembot:remove')
log.log = console.log.bind(console)

const postList = _.curry(function (token, channel, messages) {
  log('initialized: ' + messages)

  return _.map(message => deleteMessage(token, channel, message), messages)
})

const deleteMessage = function (token, channel, message) {
  log('deleted: ' + message)

  let opts = {token, channel}
  opts.ts = message.ts

  let data = querystring.stringify(opts)

  let reqOpts = {
    host: 'slack.com',
    method: 'POST',
    path: '/api/chat.delete',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Content-Length': Buffer.byteLength(data)
    }
  }

  return new Promise(function (resolve, reject) {
    let cat = function (res) {
      let acc = ''

      res.setEncoding('utf8')
      res.on('data', data => acc += data)
      res.on('error', e => reject(e))
      res.on('end', function () {
        let msg = JSON.parse(acc)

        if (msg.ok === true) {
          resolve(msg)
        } else {
          reject(msg)
        }
      })
    }

    let req = https.request(reqOpts, cat)
    req.write(data)
    req.end()
  })
}

// export
// ---------------------------------------------------------------------------

export default postList
