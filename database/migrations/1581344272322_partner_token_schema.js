'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class PartnerTokenSchema extends Schema {
  up () {
    this.create('partner_token', (table) => {
      table.increments()
      table.integer('partner_id').unsigned().notNullable()
      table.integer('token_id').unsigned().notNullable()
      table.timestamps()

      table.foreign('partner_id').references('partner.id').onDelete('cascade')
      table.foreign('token_id').references('token.id').onDelete('cascade')
    })
  }

  down () {
    this.drop('partner_token')
  }
}

module.exports = PartnerTokenSchema
