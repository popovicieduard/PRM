'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class PartnerSchema extends Schema {
  up () {
    this.create('partners', (table) => {
      table.increments()
      table.string('username', 254).notNullable().unique()
      table.string('email', 254).notNullable().unique()
      table.string('password', 60).notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('partners')
  }
}

module.exports = PartnerSchema
