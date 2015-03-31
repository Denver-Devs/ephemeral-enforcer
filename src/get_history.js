import _ from 'lodash-fp'
import https from 'https'

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
      res.on('end', () => {
        let rest = JSON.parse(acc)
        rest.prev = prev
        resolve(rest)
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
  prev.push(messages)
  nextOpts.head = _.last(messages).ts

  if (hasMore === true) {
    return request(nextOpts, prev).then(_.partialRight(handleSucc, nextOpts))
  } else {
    return prev // all done!
  }
}

const handleFail = function (err) {
  console.log('error', err)
}

// util
// ---------------------------------------------------------------------------

const createParams = function (opts) {
  let {token, channel, count, head} = opts
  let params = []

  if (token) {
    params.push(`token=${token}`)
  }

  if (channel) {
    params.push(`channel=${channel}`)
  }

  if (count) {
    params.push(`count=${count}`)
  }

  if (head) {
    params.push(`latest=${head}`)
  }

  return `/api/channels.history?${params.join('&')}`
}

// export
// ---------------------------------------------------------------------------

export default getHistory
