const http = require('http')

module.exports = () => {
    let body
    let contentType

    const builder = {
        withBody: b => {
            body = b
            return builder
        },
        withContentType: c => {
            contentType = c
            return builder
        },
        build: () => {
            const req = new http.IncomingMessage()
            if (contentType) {
                req.headers['content-type'] = contentType
                req.headers['content-length'] = 1
            }
            req.body = body
            return req
        }
    }

    return builder
}
