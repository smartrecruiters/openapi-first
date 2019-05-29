const missingScopesHandler = require('../../../middlewares/error-handlers/missing-scopes')()
const MissingRequiredScopes = require('../../../errors/MissingRequiredScopes')

describe('missing scopes error handler', () => {

    it('should catch MissingRequiredScopes', () => {
        // given
        const res = {
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

        // when
        missingScopesHandler(new MissingRequiredScopes(['write', 'delete']), undefined, res, undefined)

        // then
        expect(res.statusCode).to.eql(403)
        expect(res.headers).to.eql({'WWW-Authenticate':
                'Bearer scope="write delete", '
                + 'error="insufficient_scope", '
                + 'error_description="Insufficient scope for this resource"'})
        expect(res.message).to.eql('Missing required scopes: write,delete')
    })

    it('should not catch different errors', () => {
        // given
        const next = sinon.spy()

        // when
        missingScopesHandler(new Error(), undefined, undefined, next)

        // then
        sinon.assert.called(next)
    })

})
