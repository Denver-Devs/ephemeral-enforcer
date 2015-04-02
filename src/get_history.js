import _ from 'lodash-fp'
import https from 'https'
import querystring from 'querystring'

const getHistory = function (opts) {
  return request(opts, []).then(_.partialRight(handleSucc, opts)).catch(handleFail)
}

const request = function (opts, prev) {
  let path = createParams(opts)

  return new Promise(function (resolve, reject) {
    let cat = function (res) {
      let acc = ''

      res.on('data', (data) => acc += data)
      res.on('error', (e) => reject(e))
      res.on('end', function () {
        let msg = JSON.parse(acc)
        msg.prev = prev

        if (msg.ok === true) {
          resolve(msg)
        } else {
          reject(msg)
        }
      })
    }

    https.get({host: 'slack.com', path: path}, cat)
  })
}

// handle
// ---------------------------------------------------------------------------

const handleSucc = function (payload, opts) {
  let messages = _.clone(payload.messages)
  let prev = payload.prev
  let hasMore = payload.has_more
  let nextOpts = _.clone(opts)

  // mutate
  let acc = prev.concat(messages)

  nextOpts.latest = _.last(messages).ts

  if (hasMore === true) {
    return request(nextOpts, acc).then(_.partialRight(handleSucc, nextOpts))
  } else {
    return acc // all done!
  }
}

const handleFail = function (err) {
  console.log('error', err)
}

// util
// ---------------------------------------------------------------------------

const createParams = function (opts) {
  return `/api/channels.history?${querystring.stringify(opts)}`
}

// export
// ---------------------------------------------------------------------------

export default getHistory
