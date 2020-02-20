'use strict'

const Campaign = use('App/Models/Campaign')
const Click = use('App/Models/Click')
const moment =  use('moment')

class PartnerController {

    async getCampaigns({response}) {

        try {
            const campaigns = await Campaign.query()
                .with('categories')
                .with('countries')
                .fetch()

            return response.json(campaigns)
        }
        catch (e) {
            return response.status(400).json({message: 'Error occured'})
        }
    }

    async findCampaign({params, response}) {

        try {

            let campaign = await Campaign
            .query()
            .where('id', params.campaignId)
            .with('categories')
            .with('countries')
            .with('devices')
            .withCount('clicks', (builder) => {
                builder.where('is_lead', 1)
                builder.where('created_at', '>', moment().startOf('day').format("YYYY-MM-DD HH:mm:ss"))
                builder.where('created_at', '<', moment().endOf('day').format("YYYY-MM-DD HH:mm:ss"))
            })
            .first()
    
            return response.json(campaign)
        }
        catch (e) {
            return response.status(400).json({message: 'Error occured'})
        }
    }

    async getClicks({request, auth, response}) {

        let user = await auth.getUser()

        try {

            let clicks = await Click.query()
                .where('user_id', user.id)
                .filter(request.all())
                .with('campaign')
                .with('device')
                .with('country')
                .fetch()

            return response.json(clicks)
        }
        catch (e) {
            return response.status(400).json({message: 'Error occured'})
        }
    }
}

module.exports = PartnerController
