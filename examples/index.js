const openApiFirst = require('..')
const express = require('express')

// create express app
const app = express()

const spec = require('./spec.json')

// create open api specification initializer
const api = openApiFirst(app, spec)

// to enable setting default values on empty query params
api.use(require('../middlewares/query/defaults')())

// to link the specification with code in 'api' directory
api.use(require('../middlewares/controllers/by-property')({dir: __dirname}))

app.listen(8080)
