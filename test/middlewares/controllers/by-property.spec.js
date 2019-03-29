const controller = require('../../../middlewares/controllers/by-property')

describe('Controller', () => {

    let req, res, next

    beforeEach(() => {
        req = sinon.spy()
        res = sinon.spy()
        next = sinon.spy()
    })

    it('should build middleware', done => {
        // given
        const operation = {'x-swagger-router-controller': 'example'}
        const middleware = controller({dir: __dirname})(operation)

        // when
        const result = middleware(req, res, next)

        // then
        result.then(({req: reqArg, res: resArg, next: nextArg}) => {
            expect(reqArg).to.eql(req)
            expect(resArg).to.eql(res)
            expect(nextArg).to.eql(next)
        }).then(done)
    })

    it('should build middleware from nested file', done => {
        // given
        const operation = {'x-swagger-router-controller': 'dir.example'}
        const middleware = controller({dir: __dirname, delimiter: /\./g})(operation)

        // when
        const result = middleware(req, res, next)

        // then
        result.then(({req: reqArg, res: resArg, next: nextArg}) => {
            expect(reqArg).to.eql(req)
            expect(resArg).to.eql(res)
            expect(nextArg).to.eql(next)
        }).then(done)
    })

    it('should pass errors from rejected Promises to next', done => {
        // given
        const operation = {'x-swagger-router-controller': 'rejected-promise-controller'}
        const middleware = controller({dir: __dirname})(operation)

        // when
        const result = middleware(req, res, next)

        // then
        result.then(() => {
            expect(next.calledOnceWith(sinon.match.instanceOf(Error))).to.be.true
        }).then(done)
    })
})
