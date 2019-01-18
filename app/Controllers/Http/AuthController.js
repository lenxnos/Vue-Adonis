'use strict'
const User = use('App/Models/User')
const { validate } = use('Validator')
const Persona = use ('Persona')


/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */

/**
 * Controlador para interactuar con autenticación
 */
class AuthController {


	/**
	 * Login
	 *
	 * @method register
	 * @param {String} email
	 * @param {String} password
	 * @return {Response}
	 */
	async register({request, auth, response}) {
			const username = request.input("username")
			const name = 
			const email = request.input("email")
			const password = request.input("password")

			const {username,name,email,password,organization_name,organization_logo,organization_url,organization_country} =
			const organization_name = 
			try {
				let user = new User()
				user.username = username
				user.email = email
				user.password = password
				user = await user.save()
				let accessToken = await auth.generate(user)
				return response.json({"user": user, "access_token": accessToken})
			}catch(e) {
				console.log(e)
			}
	}
	/**
	 * Login
	 *
	 * @method register
	 * @param {String} email
	 * @param {String} password
	 * @return {Response}
	 */
	async login({request, auth, response}) {
	    const rules = {
	      email: 'required|email',
	      password: 'required'
	    }

	    const { email, password } = request.only(['email', 'password'])

	    const validation = await validate({ email, password }, rules)


	    if (!validation.fails()) {
	      try {
	        return await auth.withRefreshToken().attempt(email, password)
	      } catch (err) {
	        response.status(401).send({ error: 'Usuario o contraseña incorrecta' })
	      }
	    } else {
	      response.status(401).send(validation.messages())
		}
        
	}
	/**
	 * Devuelve un nuevo token usando el refresh_token
	 *
	 * @method refresh
	 * @param {String} refresh_token
	 * @return {Response}
	 */
	async refresh({request,auth}) {
		const { refresh_token } = request.all()
     	return await auth
        	.newRefreshToken()
        	.generateForRefreshToken(refresh_token)
		  
	}


		/**
			* Dispara el evento que envía el e-mail de recuperación de contraseña 
			* con el token
			* @method forgot
			* @param {String} email
			* @return {Response}
		*/
	async forgot ({ request,response }) {		
		try {
			const email = request.input('email')
			await Persona.forgotPassword(email)
			return {success:true}
		} catch(e) {
	        response.status(401).send({error:'Correo Inválido'})
		}

	}

		/**
	 * Recuperación de contraseña utilizando un token
	 *
	 * @method recover
	 * @param {String} token
	 * @param {String} password
	 * @param {String} password_confirmation
	 * @return {Response}
	 */
	async recover({ request,params }) {
	  const token = decodeURIComponent(params.token)
	  const payload = request.only(['password', 'password_confirmation'])
	  const user = await Persona.updatePasswordByToken(token, payload)
	  return {success:true}
	}

}

module.exports = AuthController
