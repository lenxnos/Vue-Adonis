'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class CountriesSchema extends Schema {
  up () {
    this.create('countries', (table) => {
      table.increments()
      table.string('iso2',2)
      table.string('iso3',3)
    })
  }

  down () {
    this.drop('countries')
  }
}

module.exports = CountriesSchema
