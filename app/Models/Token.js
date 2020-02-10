'use strict'

const Model = use('Model')

class Token extends Model {

    user(){
         return this.belongsTo('App/Models/User')
    }

    advertiser(){
        return this.belongsTo('App/Models/Advertiser')
    }

    partner(){
        return this.belongsTo('App/Models/Partner')
    }
}

module.exports = Token
