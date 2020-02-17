'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Campaign extends Model {

    static boot () {
        super.boot()

        this.addTrait('@provider:Lucid/Slugify', {
            fields: { slug: 'title' },
            strategy: 'dbIncrement',
            disableUpdates: false
        })
    }

    advertiser() {
        return this.belongsTo("App/Models/User");
    }

    clicks() {
        return this.hasMany("App/Models/Click");
    }

    categories() {
        return this.belongsToMany("App/Models/Category");
    }

    countries() {
        return this.belongsToMany("App/Models/Country");
    }

    devices() {
        return this.belongsToMany("App/Models/Device");
    }
}

module.exports = Campaign
