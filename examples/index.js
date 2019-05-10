/* eslint-disable no-console */
const openApiFirst = require('..')
const express = require('express')
const path = require('path')

const authenticate = require('./oauth2/middlewares/authenticate')

// create express app
const app = express()

// simulate OAuth 2.0 bearer token authentication in `access_token` query param for /users path
app.use('/users', authenticate)

const spec = require('./spec.json')

// create open api specification initializer
const api = openApiFirst(app, spec)

// enable oauth 2.0 granted scopes authorization
api.use(require('../middlewares/oauth/oauth-scopes')({grantedScopesLocation: 'user.grantedScopes'}))
// nicely handle MissingRequiredScopesError error
app.use(require('../middlewares/error-handlers/missing-scopes')())

// to enable setting default values on empty query params
api.use(require('../middlewares/query/defaults')())

// to link the specification with code in 'api' directory
api.use(require('../middlewares/controllers/by-property')({
    dir: path.join(__dirname, 'api'), propertyName: 'operationId'
}))

const server = app.listen(8080, () => console.log('Server listening:', server.address()))
