'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class AdvertiserTokenSchema extends Schema {
  up () {
    this.create('advertiser_token', (table) => {
      table.increments()
      table.integer('advertiser_id').unsigned().notNullable()
      table.integer('token_id').unsigned().notNullable()
      table.timestamps()

      table.foreign('advertiser_id').references('advertiser.id').onDelete('cascade')
      table.foreign('token_id').references('token.id').onDelete('cascade')
    })
  }

  down () {
    this.drop('advertiser_token')
  }
}

module.exports = AdvertiserTokenSchema
