const {runWithBaggage} = require('../../../lib/utils/otel')
const {context, propagation} = require('@opentelemetry/api')

describe('otel utils', () => {
    let sandbox
    let mockActiveCtx
    let mockBaggage
    let mockUpdatedBaggage
    let setEntryStub

    beforeEach(() => {
        sandbox = sinon.createSandbox()

        // Mock baggage entry
        mockBaggage = {
            setEntry: sandbox.stub()
        }
        mockUpdatedBaggage = {}
        setEntryStub = mockBaggage.setEntry.returns(mockUpdatedBaggage)

        // Mock context
        mockActiveCtx = {}
        sandbox.stub(context, 'active').returns(mockActiveCtx)
        sandbox.stub(context, 'with').callsFake((ctx, fn) => fn())

        // Mock propagation
        sandbox.stub(propagation, 'getBaggage').returns(mockBaggage)
        sandbox.stub(propagation, 'createBaggage').returns(mockBaggage)
        sandbox.stub(propagation, 'setBaggage').returns(mockActiveCtx)
    })

    afterEach(() => {
        sandbox.restore()
    })

    it('should run callback with baggage entry set', () => {
        // given
        const baggageKey = 'test-key'
        const baggageValue = 'test-value'
        const callbackSpy = sandbox.spy()

        // when
        runWithBaggage(baggageKey, baggageValue, callbackSpy)

        // then
        sinon.assert.calledOnce(context.active)
        sinon.assert.calledWith(propagation.getBaggage, mockActiveCtx)
        sinon.assert.calledWith(setEntryStub, baggageKey, {value: baggageValue})
        sinon.assert.calledWith(propagation.setBaggage, mockActiveCtx, mockUpdatedBaggage)
        sinon.assert.calledOnce(context.with)
        sinon.assert.calledOnce(callbackSpy)
    })

    it('should create baggage if none exists', () => {
        // given
        propagation.getBaggage.returns(null)
        const callbackSpy = sandbox.spy()

        // when
        runWithBaggage('key', 'value', callbackSpy)

        // then
        sinon.assert.calledOnce(propagation.createBaggage)
        sinon.assert.called(setEntryStub)
        sinon.assert.calledOnce(callbackSpy)
    })

    it('should throw error if callback is not a function', () => {
        // given
        const notAFunction = 'not a function'
        let errorThrown = false

        // when
        try {
            runWithBaggage('key', 'value', notAFunction)
        } catch (error) {
            errorThrown = true
            sinon.assert.match(error.message, 'Callback must be a function')
        }

        // then
        sinon.assert.match(errorThrown, true)
    })
})
