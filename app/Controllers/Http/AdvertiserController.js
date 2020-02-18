'use strict'

const Campaign = use('App/Models/Campaign')
const Category = use('App/Models/Category')
const Country = use('App/Models/Country')
const Device = use('App/Models/Device')
const Database = use('Database')
const Click = use('App/Models/Click')
const moment = use('moment')

class AdvertiserController {

    async createCampaign({request, auth, response}) {
        let {form} = request.all();

        let user = await auth.getUser()

        try {
            const campaign_categories = (await Category.query().whereIn('slug', form.categories ).fetch()).toJSON().map(category => category.id)

            const campaign_countries = (await Country.query().whereIn('code', form.countries ).fetch()).toJSON().map(country => country.id)

            const campaign_devices = (await Device.query().whereIn('slug', form.devices ).fetch()).toJSON().map(device => device.id)

            const campaign = await Campaign.create({
                user_id: user.id,
                title: form.title,
                description: form.description,
                conversion_goal: form.conversion_goal,
                url: form.url,
                commision: form.commision,
                cap: form.cap
            })

            await campaign.categories().attach(campaign_categories)

            await campaign.countries().attach(campaign_countries)

            await campaign.devices().attach(campaign_devices)

            return response.json(campaign)
        }
        catch (e) {
            return response.status(400).json({message: 'Error occured'})
        }
    }

    async updateCampaign({request, params, auth, response}) {
        let {form} = request.all();

        let user = await auth.getUser()

        try {

            let campaign = await Campaign.findOrFail(params.campaignId)

            if(campaign.user_id != user.id){
                return response.status(401).json({message: 'This campaign is not associated with the advertiser'})
            }

            const campaign_categories = (await Category.query().whereIn('slug', form.categories ).fetch())
            .toJSON()
            .map(category => category.id)

            const campaign_countries = (await Country.query().whereIn('code', form.countries ).fetch())
            .toJSON()
            .map(country => country.id)

            const campaign_devices = (await Device.query().whereIn('slug', form.devices ).fetch())
            .toJSON()
            .map(device => device.id)

            campaign.merge({
                title: form.title,
                description: form.description,
                conversion_goal: form.conversion_goal,
                url: form.url,
                commision: form.commision,
                cap: form.cap
            })

            await campaign.save()

            await campaign.categories().sync(campaign_categories)

            await campaign.countries().sync(campaign_countries)

            await campaign.devices().sync(campaign_devices)

            return response.json(campaign)
        }
        catch (e) {
            return response.status(400).json({message: 'Error occured'})
        }
    }

    async getCampaigns({auth, response}) {

        let user = await auth.getUser()

        try {
            const campaigns = await Campaign
            .query()
            .where('user_id', user.id)
            .with('categories')
            .with('countries')
            .with('devices')
            .withCount('clicks as clicks')
            .withCount('clicks as leads', (builder) => {
                builder.where('is_lead', true)
            })
            .with('clicks', (builder) => {
                builder.select(Database.raw('sum(cost) as spend'))
                .where('is_lead', 1)
                .select('campaign_id')
                .groupBy('campaign_id')
            })
            .fetch()

            return response.json(campaigns)
        }
        catch (e) {
            return response.status(400).json({message: 'Error occured'})
        }
    }

    async findCampaign({params, auth, response}) {

        let user = await auth.getUser()

        try {
            let campaign = await Campaign
            .query()
            .where('user_id', user.id)
            .where('id', params.campaignId)
            .with('categories')
            .with('countries')
            .with('devices')
            .withCount('clicks', (builder) => {
                builder.where('created_at', '>', moment().startOf('day').format("YYYY-MM-DD HH:mm:ss"))
                builder.where('created_at', '<', moment().endOf('day').format("YYYY-MM-DD HH:mm:ss"))
            })
            .first()
    
            if(campaign.user_id != user.id){
                return response.status(401).json({message: 'This campaign is not associated with the advertiser'})
            }
    
            return response.json(campaign)
        }
        catch (e) {
            return response.status(400).json({message: 'Error occured'})
        }
    }

    async deleteCampaign({params, auth, response}) {

        let user = await auth.getUser()

        try {
            let campaign = await Campaign
            .query()
            .where('user_id', user.id)
            .where('id', params.campaignId)
            .first()

            if(campaign.user_id != user.id){
                return response.status(401).json({message: 'This campaign is not associated with the advertiser'})
            }

            campaign.is_removed = true
            campaign.is_active = false

            await campaign.save()
    
            return response.json({message: 'Campaign deleted!', success: true})
        }
        catch (e) {
            return response.status(400).json({message: 'Error occured'})
        }
    }

    async updateCampaignStatus({request, params, auth, response}) {
        let { status } = request.all();

        let user = await auth.getUser()

        try {

            let campaign = await Campaign.findOrFail(params.campaignId)

            if(campaign.user_id != user.id){
                return response.status(401).json({message: 'This campaign is not associated with the advertiser'})
            }
    
            if(campaign.is_removed == true){
                return response.status(401).json({message: 'This campaign has been removed'})
            }

            campaign.is_active = status

            await campaign.save()

            return response.json(campaign)
        }
        catch (e) {
            return response.status(400).json({message: 'Error occured'})
        }
    }

    async getClicks({request, auth, response}) {

        let user = await auth.getUser()

        try {

            let user_campaigns = await Campaign.query()
            .where('user_id', user.id)
            .pluck('id')

            let clicks = await Click.query()
                .whereIn('campaign_id', user_campaigns)
                .filter(request.all())
                .fetch()

            return response.json(clicks)
        }
        catch (e) {
            return response.status(400).json({message: 'Error occured'})
        }
    }

    async findClick({params, auth, response}) {

        let user = await auth.getUser()

        try {

            let click = await Click.query()
                .where('id', params.clickId)
                .where('is_lead', 1)
                .with('device')
                .with('country')
                .first()

            let campaign = await Campaign.findOrFail(click.campaign_id)

            if(campaign.user_id != user.id){
                return response.status(401).json({message: 'This Lead is not associated with the advertiser'})
            }

            return response.json(click)
        }
        catch (e) {
            return response.status(400).json({message: 'Error occured'})
        }
    }
}

module.exports = AdvertiserController
