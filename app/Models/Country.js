'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Country extends Model {

    campaigns() {
        return this.belongsToMany("App/Models/Campaign");
    }
}

module.exports = Country
