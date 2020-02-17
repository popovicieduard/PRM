'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class CampaignSchema extends Schema {
  up () {
    this.create('campaigns', (table) => {
      table.increments()
      table.integer('user_id').unsigned().references('id').inTable('users')
      table.string('title').notNullable().unique()
      table.string('slug').notNullable().unique()
      table.text('description').notNullable()
      table.string('conversion_goal').notNullable()
      table.string('url').notNullable()
      table.float('commision').notNullable()
      table.integer('cap').notNullable()
      table.boolean('is_active').defaultTo(true)
      table.boolean('is_removed').defaultTo(false)
      table.timestamps()
    })
  }

  down () {
    this.drop('campaigns')
  }
}

module.exports = CampaignSchema
