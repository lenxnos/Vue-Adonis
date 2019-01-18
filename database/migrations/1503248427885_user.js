'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class UserSchema extends Schema {
  up () {
    this.create('users', (table) => {
      table.increments()
      table.string('username', 80).notNullable().unique()
      table.string('email', 254).notNullable().unique()
      table.string('password', 60).notNullable()
      table.integer('sign_in_count')
      table.date('current_sign_in_at')
      table.date('last_sign_in_at')
      table.string('current_sign_in_ip',20)
      table.string('last_sign_in_ip',20)
      table.boolean('status').notNullable()
      table.integer('organization_id')
      table.foreign('organization_id').references('organizations.id').onDelete('cascade');
      table.integer('person_id')
      table.foreign('person_id').references('people.id').onDelete('cascade');
      table.timestamps()
    })
  }

  down () {
    this.drop('users')
  }
}

module.exports = UserSchema
