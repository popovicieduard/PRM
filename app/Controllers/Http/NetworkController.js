'use strict'

const Campaign = use('App/Models/Campaign')
const User = use('App/Models/User')
const Click = use('App/Models/Click')
const moment = use('moment')
const _ = use('lodash')

class NetworkController {

    async getCampaigns({ response }) {

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

    async deleteCampaign({response, params}) {

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

    async getClicks({request,response}) {

        try {
            let clicks = await Click.query()
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

    async statsCount({response}) {

        try {
            let users = await User.query()
                .where('is_active', 1)
                .with('roles')
                .fetch()

            let activeCampaigns = await Campaign.query()
                .where('is_active', 1)
                .getCount()

            let partners = users.toJSON().filter((partner) => {
                if (partner.roles.length){
                    return _.first(partner.roles).slug == 'partner'
                }
                return []
            }).length

            let advertisers = users.toJSON().filter((advertiser) => {
                if (advertiser.roles.length){
                    return _.first(advertiser.roles).slug == 'advertiser'
                }
                return []
            }).length 

            const stats = {
                advertisers: advertisers,
                partners: partners,
                campaigns: activeCampaigns
            }

            return response.json(stats)
        }
        catch (e) {
            return response.status(400).json({message: 'Error occured'})
        }
    }

    async getPartners({response}){
        try {

            let partners = await User.query()
                .whereHas('roles', (builder) => {
                    builder.where('slug', 'partner')
                })
                .fetch()
            
            return response.json(partners)
        } catch (error) {
            return response.status(400).json({message: 'Error occured'})
        }
    }

    async getAdvertisers({response}){
        try {

            let advertisers = await User.query()
                .whereHas('roles', (builder) => {
                    builder.where('slug', 'advertiser')
                })
                .fetch()
            
            return response.json(advertisers)
        } catch (error) {
            return response.status(400).json({message: 'Error occured'})
        }
    }

    async updateUserStatus({request, params, response}){
        let { status } = request.all();

        try {

            let user = await User.findOrFail(params.userId)

            user.is_active = status

            await user.save()

            return response.json(user)
        }
        catch (e) {
            return response.status(400).json({message: 'Error occured'})
        }
    }
}

module.exports = NetworkController
