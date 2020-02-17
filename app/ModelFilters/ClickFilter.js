'use strict'

const ModelFilter = use('ModelFilter')
const moment = use('moment')

class ClickFilter extends ModelFilter {

    between (date) {
        let start = moment(date[0]).format("YYYY-MM-DD HH:mm:ss")
        let end = moment(date[1]).format("YYYY-MM-DD HH:mm:ss")
        return this.whereBetween('created_at',[start,end])
    }

    lead(lead){
        return this.where('is_lead', lead)
    }

    partner(partner_id){
        return this.where('user_id', partner_id)
    }

    campaign(campaign_id){
        return this.where('campaign_id', campaign_id)
    }
}

module.exports = ClickFilter
