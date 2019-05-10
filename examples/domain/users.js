const users = [
    {
        id: '1',
        firstName: 'Bob',
        lastName: 'Jordan'
    },
    {
        id: '2',
        firstName: 'Sally',
        lastName: 'Wright'
    }
]

module.exports.findById = id => {
    const user = users.find(user => user.id === id)
    return user && Object.assign({}, user)
}

module.exports.getAll = () => users
