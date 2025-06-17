const {context, propagation} = require('@opentelemetry/api')

function runWithBaggage(baggageKey, baggageValue, callback) {
    if (typeof callback !== 'function') {
        throw new Error('Callback must be a function')
    }

    const activeCtx = context.active()
    const currentBaggage = propagation.getBaggage(activeCtx) || propagation.createBaggage()
    const updatedBaggage = currentBaggage.setEntry(baggageKey, {value: baggageValue})
    const newCtx = propagation.setBaggage(activeCtx, updatedBaggage)

    context.with(newCtx, () => callback())
}

module.exports = {
    runWithBaggage
}

