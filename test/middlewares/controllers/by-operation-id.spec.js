const controller = require('../../../middlewares/controllers/by-property')
const path = require('path')

describe('Controller', () => {

    it('should return middleware', () => {
        // given
        const operation = {'x-swagger-router-controller': 'package'}

        // when
        const middleware = controller({dir: path.join(__dirname, '../../..')})(operation)

        // then
        expect(middleware).to.equal(require('../../../package'))
    })

    it('should return middleware', () => {
        // given
        const operation = {'x-swagger-router-controller': 'test.globals'}

        // when
        const middleware = controller({dir: path.join(__dirname, '../../..'), delimiter: /\./g})(operation)

        // then
        expect(middleware).to.equal(require('../../globals'))
    })
})
