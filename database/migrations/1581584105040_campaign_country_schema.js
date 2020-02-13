'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class CampaignCountrySchema extends Schema {
  up () {
    this.create('campaign_country', (table) => {
      table.increments()
      table.integer('campaign_id').unsigned().index()
      table.foreign('campaign_id').references('id').on('campaigns').onDelete('cascade')
      table.integer('country_id').unsigned().index()
      table.foreign('country_id').references('id').on('countries').onDelete('cascade')
      table.timestamps()
    })
  }

  down () {
    this.drop('campaign_country')
  }
}

module.exports = CampaignCountrySchema
