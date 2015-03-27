'use strict'

import http from 'http'

var app = http.createServer(function(req, res) {
  req.pipe(res)
})

export default app
