'use strict'

const Campaign = use('App/Models/Campaign')
const Category = use('App/Models/Category')
const Country = use('App/Models/Country')
const Device = use('App/Models/Device')
const Database = use('Database')
const Click = use('App/Models/Click')
const moment = use('moment')

class NetworkController {

    async allCampaigns({ response }) {

        try {
            const campaigns = await Campaign.all()

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

    async deleteCampaign({response}) {

        try {
            let campaign = await Campaign
            .query()
            .where('id', params.campaignId)
            .first()

            campaign.is_removed = true
            campaign.is_active = false

            await campaign.save()
    
            return response.json({message: 'Campaign deleted!', success: true})
        }
        catch (e) {
            return response.status(400).json({message: 'Error occured'})
        }
    }

    async clicks({request,response}) {

        try {
            let clicks = await Click.query()
                .where('created_at', '>', moment().startOf('month').format("YYYY-MM-DD HH:mm:ss"))
                .where('created_at', '<', moment().endOf('month').format("YYYY-MM-DD HH:mm:ss"))
                .filter(request.all())
                .fetch()

            return response.json(clicks)
        }
        catch (e) {
            return response.status(400).json({message: 'Error occured'})
        }
    }

    async findClick({params, response}) {

        try {

            let click = await Click.query()
                .where('id', params.clickId)
                .where('is_lead', 1)
                .with('device')
                .with('country')
                .first()

            return response.json(click)
        }
        catch (e) {
            return response.status(400).json({message: 'Error occured'})
        }
    }
}

module.exports = NetworkController
