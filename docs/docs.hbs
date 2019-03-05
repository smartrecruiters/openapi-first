# @smartrecruiters/openapi-first

[![NPM Version][npm-image]][npm-url]
[![NPM Downloads][downloads-image]][downloads-url]
[![Node.js Version][node-version-image]][node-version-url]
[![Licence][license-image]][license-url]
[![Build][travis-image]][travis-url]

Start your node REST app with designing API first!

## Is it for you?

If you:
- use OpenAPI Specification 3.0 to document your REST APIs written in node.js,
- like design first approach regardign REST APIs
- want your specification to be single source of truth of your API,
- want to handle validation and parsing of requests query, body, content-type in a unified manner for all API endpoints,

then `@smartrecruiters/openapi-first` is what you are looking for!

This module initializes your API connect-style application with specification in
[OpenAPI Specification 3.0](https://openapis.org/specification) format.

## How to start

Let's say you have specification in OpenAPI Specification 3.0 in `spec.json`:

```javascript
{
    "openapi": "3.0.0",
    "info": {
        "version": "1.0.0",
        "title": "Hello World API"
    },
    "paths": {
        "/hello": {
            "get": {
                "responses": {
                    "200": {
                        "description": "Success",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "$ref": "#/components/schemas/Greeting"
                                }
                            }
                        }
                    }
                },
                "x-swagger-router-controller": "greeting/hello",
                "parameters": [
                    {
                        "in": "query",
                        "name": "name",
                        "schema": {
                            "type": "string",
                            "default": "world"
                        }
                    }
                ]
            }
        }
    },
    "components": {
        "schemas": {
            "Greeting": {
                "type": "object",
                "properties": {
                    "greeting": {
                        "type": "string"
                    }
                }
            }
        }
    }
}
```

Now you can implement connect-style middleware with "business logic" in `greeting/hello.js`:

```javascript
module.exports = function(req, res) {
    res.status(200).json({greeting: `Hello, ${req.query.name}!`})
}
```

Now, let's make an `app.js` file:
```javascript
const openApiFirst = require('@smartrecruiters/openapi-first')
const express = require('express')

// create express app
const app = express()

const spec = require('./spec.json')

// create open api specification initializer
const api = openApiFirst(app, spec)

// to enable setting default values on empty query params
api.use(require('@smartrecruiters/openapi-first/middlewares/query/defaults')())

// to link the specification with code in 'api' directory
api.use(require('@smartrecruiters/openapi-first/middlewares/controllers/by-property')({dir: __dirname}))

app.listen(8080)

```

We can now run the application:
```bash
node app
```
To verify it's working, let's hit the endpoint:
```bash
curl localhost:8080/hello?who=world
```
The response should be 200 with body:
```json
{"greeting":"Hello, world!"}
```

## openapi middlewares

You can use one of the middlewares under `@smartrecruiters/middlewares/*` or create your own. Such middlewares will be 
applied to connect-style app for each operation as they are specification and operation aware. For instace, 
`@smartrecruiters/middlewares/query/validate` middleware will be applied to any and only operation which has query 
parameters defined, passing an Error to `next` callback when `req.query` is invalid. 

Currently following middlewares are available:
- request body validation,
- request body parsing (e.g. form string parameters to types specified in API documentation)
- setting default values on request body,
- query parameters validation,
- setting default query parameters values
- removing unspecified query parameters,
- content type validation,
- routing to appropriate controller,
- oauth scopes authorization,
- error handlers (`MissingRequiredScopes`).

### Validation middlewares

Middlewares for request body and query validation expects schema validators in order to be created.
The recommended schema validator is [`@smartrecruiters/openapi-schema-validator`](https://www.npmjs.com/package/@smartrecruiters/openapi-schemas-validator)

### Create your own openapi middleware

Adding your own openapi is very simple. Let's say your operation has extension
[OpenAPI Specification 3.0 Specification Extension](https://github.com/OAI/OpenAPI-Specification/blob/master/versions/3.0.1.md#specificationExtensions) 'x-only-admin'. 
If it is set on, this will mean that only users with admin can use this method.
Assuming some preceding middleware is setting `req.user.role`, you can write a simple openapi middleware
that will gather information from operation object and act accordingly:
```javascript
const onlyAdminMiddleware = operation =>
    (req, res, next) => {
        if(operation['x-only-admin'] && req.user.role !== "admin") {
            res.status(403).json("Access forbidden. For this operation, you need to have admin role")
        }
        return next()
    }
```

## Contributing

Please see our [Code of conduct](docs/CODE_OF_CONDUCT.md) and [Contributing guidelines](docs/CONTRIBUTING.md)

## License

[MIT](LICENSE)

[npm-image]: https://img.shields.io/npm/v/@smartrecruiters/openapi-first.svg
[npm-url]: https://www.npmjs.com/package/@smartrecruiters/openapi-first
[downloads-image]: https://img.shields.io/npm/dm/@smartrecruiters/openapi-first.svg
[downloads-url]: https://www.npmjs.com/package/@smartrecruiters/openapi-first
[node-version-image]: https://img.shields.io/node/v/@smartrecruiters/openapi-first.svg
[node-version-url]: https://nodejs.org/en/download/
[license-url]: https://github.com/smartrecruiters/openapi-first/blob/master/LICENSE
[license-image]: https://img.shields.io/npm/l/@smartrecruiters/openapi-first.svg
[travis-url]: https://travis-ci.org/smartrecruiters/openapi-first
[travis-image]: https://api.travis-ci.org/smartrecruiters/openapi-first.svg?branch=master
