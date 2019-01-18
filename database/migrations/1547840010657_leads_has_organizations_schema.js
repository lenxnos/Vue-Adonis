'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class LeadsHasOrganizationsSchema extends Schema {
  up () {
    this.create('leads_has_organizations', (table) => {
      table.increments()
      table.integer('organization_id')
      table.foreign('organization_id').references('organizations.id').onDelete('cascade');
      table.integer('person_id')
      table.foreign('person_id').references('people.id').onDelete('cascade');

    })
  }

  down () {
    this.drop('leads_has_organizations')
  }
}

module.exports = LeadsHasOrganizationsSchema
