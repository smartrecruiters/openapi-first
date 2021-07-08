const refResolver = require('../../../lib/utils/ref-resolver')

describe('refResolver util', () => {

    const expectedParam1 = {
        name: 'p1',
        schema: {
            type: 'string',
            enum: ['x1', 'x2', 'x3'],
            default: 'x2'
        }
    }

    const expectedParam2 = {
        name: 'size',
        type: 'integer',
        default: 10
    }

    const validSpec = {
        paths: {
            '/a': {
                get: {
                    operationId: 'a',
                    parameters: [
                        {name: 'p1', schema: {$ref: '#/components/schemas/Schema1'}},
                        {$ref: '#/components/schemas/Schema2'}
                    ]
                }
            }
        },
        components: {
            schemas: {
                Schema1: {
                    type: 'string',
                    enum: ['x1', 'x2', 'x3'],
                    default: 'x2'
                },
                Schema2: {
                    name: 'size',
                    type: 'integer',
                    default: 10
                }
            }
        }
    }

    it('should resolve refs', () => {
        // when
        const resolvedParameter1 = refResolver(validSpec)(validSpec.paths['/a'].get.parameters[0])
        const resolvedParameter2 = refResolver(validSpec)(validSpec.paths['/a'].get.parameters[1])

        // then
        expect(resolvedParameter1).to.eql(expectedParam1)
        expect(resolvedParameter2).to.eql(expectedParam2)
    })
})
