'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ClickSchema extends Schema {
  up () {
    this.create('clicks', (table) => {
      table.increments()
      table.integer('user_id').unsigned().references('id').inTable('users')
      table.integer('campaign_id').unsigned().references('id').inTable('campaigns')
      table.integer('country_id').unsigned().references('id').inTable('countries')
      table.integer('device_id').unsigned().references('id').inTable('devices')
      table.float('cost').notNullable()
      table.string('ip_address').notNullable()
      table.boolean('is_lead').defaultTo(false)
      table.boolean('is_active').defaultTo(false)
      table.timestamps()
    })
  }

  down () {
    this.drop('clicks')
  }
}

module.exports = ClickSchema
