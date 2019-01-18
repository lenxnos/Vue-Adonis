'use strict'

/*
|--------------------------------------------------------------------------
| UserSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')
const User =  use('App/Models/User')
const Person =  use('App/Models/Person')

class UserSeeder {
  async run () {
  	let person = await Person.create({
  		name:'Randy',
  		lastname:'Gil',
  		phone:'+584143461587',
  		country:'VE',
  		address:'Venezuela, Guárico'
  	});
  	User.create({
  		username:'randy',
  		email:'randy@bizplanner.io',
  		password:'123456',
      status:true,
  		person_id:person.id
  	})

  }
}

module.exports = UserSeeder
