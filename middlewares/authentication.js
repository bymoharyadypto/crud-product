const {User} = require ('../models')
const {verify} = require('../helpers/jwt-helpers')


async function authentication (req, res, next) {
    try {
        if (!req.headers.access_token) throw ({ name: 'MissingAccessToken' })
        const payload = verify(req.headers.access_token)
        const { email } = payload
        const data = await User.findOne({ where: { email } })
        if (!data) throw ({ name: 'Unauthorized' })
        req.user = {
            id: data.id,
            first_name: data.first_name,
            email: data.email,
        }
        next()
    } catch (error) {
        next(error)
    }
}

module.exports = authentication