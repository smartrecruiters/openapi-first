const missingScopesHandler = require('../../../middlewares/error-handlers/missing-scopes')()
const MissingRequiredScopes = require('../../../errors/MissingRequiredScopes')

describe('missing scopes error handler', () => {

    it('should catch MissingRequiredScopes', () => {
        // given
        const res = {
            json(obj) {
                this.message = obj.message
                return this
            },
            status(status) {
                this.statusCode = status
                return this
            }
        }

        // when
        missingScopesHandler(new MissingRequiredScopes(['write']), undefined, res, undefined)

        // then
        expect(res.statusCode).to.eql(403)
        expect(res.message).to.eql('Missing required scopes: write')
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
