'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class PersonSchema extends Schema {
  up () {
    this.create('people', (table) => {
      table.increments()
      table.string('name', 80)
      table.string('lastname', 80)
      table.string('phone',20)
      table.string('email',20)
      table.string('country',3)
      table.text('address')
      table.string('gender',1)
      table.date('born_date')
      table.timestamps()
    })
  }

  down () {
    this.drop('people')
  }
}

module.exports = PersonSchema
