'use strict'
const User = use('App/Models/User')
const Hash = use('Hash')
const { validate } = use('Validator')
const Encryption = use('Encryption')
const Persona = use ('Persona')
const Event = use('Event')
class AuthController {
	async register({request, auth, response}) {
        const username = request.input("username")
        const email = request.input("email")
        const password = request.input("password")

        let user = new User()
        user.username = username
        user.email = email
        user.password = password
        user = await user.save()
        let accessToken = await auth.generate(user)
        return response.json({"user": user, "access_token": accessToken})
	}

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

	async refresh({request,auth,response}) {
		const { refresh_token, email, password } = request.all()
     	return await auth
        	.newRefreshToken()
        	.generateForRefreshToken(refresh_token)
		  
	}

	async forgot ({ request,auth,response }) {		
		try {
			const email = request.input('email')
			await Persona.forgotPassword(email)
			return {success:true}
		} catch(e) {
	        response.status(401).send({error:'Correo Inválido'})
 
		}

	}
	async recover({ request,params }) {
	  const token = decodeURIComponent(params.token)
	  const payload = request.only(['password', 'password_confirmation'])
	  const user = await Persona.updatePasswordByToken(token, payload)
	  return {success:true}
	}

}

module.exports = AuthController
