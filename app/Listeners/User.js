'use strict'

const User = exports = module.exports = {}

User.forgot = async payload => {

	console.log(`Enviar token ${payload.token} a ${payload.user.email}`)
}
