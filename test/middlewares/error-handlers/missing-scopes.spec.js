const missingScopesHandler = require('../../../middlewares/error-handlers/missing-scopes')
const MissingRequiredScopes = require('../../../errors/MissingRequiredScopes')

describe('missing scopes error handler', () => {

    let res

    beforeEach(() => {
        res = {
            setHeader(name, value) {
                if (!this.headers) {
                    this.headers = {}
                }
                this.headers[name] = value
                return this
            },
            status(status) {
                this.statusCode = status
                return this
            },
            json(obj) {
                this.message = obj.message
                return this
            }
        }
    })

    it('should catch MissingRequiredScopes', () => {
        // given

        // when
        missingScopesHandler()(new MissingRequiredScopes(['write', 'delete']), undefined, res, undefined)

        // then
        expect(res.statusCode).to.eql(403)
        expect(res.headers).to.eql({'WWW-Authenticate':
                'Bearer scope="write delete", error="insufficient_scope", '
                + 'error_description="Insufficient scope for this resource"'})
        expect(res.message).to.eql('Missing required scopes: write,delete')
    })

    it('should catch MissingRequiredScopes and return response header with the given realm', () => {
        // given

        // when
        missingScopesHandler({realm: 'Test'})(new MissingRequiredScopes(['write']), undefined, res, undefined)

        // then
        expect(res.statusCode).to.eql(403)
        expect(res.headers).to.eql({'WWW-Authenticate':
                'Bearer realm="Test", scope="write", error="insufficient_scope", '
                + 'error_description="Insufficient scope for this resource"'})
        expect(res.message).to.eql('Missing required scopes: write')
    })

    it('should not catch different errors', () => {
        // given
        const next = sinon.spy()

        // when
        missingScopesHandler()(new Error(), undefined, undefined, next)

        // then
        sinon.assert.called(next)
    })

})
