'use strict'


const Country = use("App/Models/Country")



/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */


/**
 * Controlador para interactuar con países
 */
class CountryController {

    /**
     * Login
     *
     * @method index
     * @return {Response}
     */
  async index ({ request, response, view }) {
    return Country.all()
  }

 
 
}

module.exports = CountryController
