'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

const ClickFilter = use('App/ModelFilters/ClickFilter')

class Click extends Model {

    static boot () {
        super.boot()
        this.addTrait('@provider:Filterable', ClickFilter)
    }

    partner() {
        return this.belongsTo("App/Models/User");
    }

    campaign() {
        return this.belongsTo("App/Models/Campaign");
    }

    country() {
        return this.belongsTo("App/Models/Country");
    }

    device() {
        return this.belongsTo("App/Models/Device");
    }
}

module.exports = Click
