'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class CampaignCategorySchema extends Schema {
  up () {
    this.create('campaign_category', (table) => {
      table.increments()
      table.integer('campaign_id').unsigned().index()
      table.foreign('campaign_id').references('id').on('campaigns').onDelete('cascade')
      table.integer('category_id').unsigned().index()
      table.foreign('category_id').references('id').on('categories').onDelete('cascade')
      table.timestamps()
    })
  }

  down () {
    this.drop('campaign_category')
  }
}

module.exports = CampaignCategorySchema
