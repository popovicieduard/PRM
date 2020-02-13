'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class CampaignDeviceSchema extends Schema {
  up () {
    this.create('campaign_device', (table) => {
      table.increments()
      table.integer('campaign_id').unsigned().index()
      table.foreign('campaign_id').references('id').on('campaigns').onDelete('cascade')
      table.integer('device_id').unsigned().index()
      table.foreign('device_id').references('id').on('devices').onDelete('cascade')
      table.timestamps()
    })
  }

  down () {
    this.drop('campaign_device')
  }
}

module.exports = CampaignDeviceSchema
