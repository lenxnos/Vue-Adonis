'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class OrganizationsSchema extends Schema {
  up () {
    this.create('organizations', (table) => {
      table.increments()
 	  table.string('name',255)
 	  table.string('logo',255)
 	  table.string('url',255)
 	  table.boolean('status')
 	  table.timestamps();
 	  table.integer('country_id').references('countries.id').onDelete('cascade');

    })
  }

  down () {
    this.drop('organizations')
  }
}

module.exports = OrganizationsSchema
