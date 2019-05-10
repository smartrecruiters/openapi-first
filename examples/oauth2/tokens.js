const tokens = [
    {
        token: 'abc',
        userId: '1',
        grantedScopes: ['read:users']
    },
    {
        token: 'def',
        userId: '2',
        grantedScopes: ['write:users']
    }
]

module.exports.findToken = value => {
    const token = tokens.find(token => token.token === value)
    return token && Object.assign({}, token)
}
