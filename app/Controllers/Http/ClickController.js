'use strict'

const Click = use('App/Models/Click')
const User = use('App/Models/User')
const Campaign = use('App/Models/Campaign')
const Country = use('App/Models/Country')
const Device = use('App/Models/Device')
const DeviceDetector = use('device')
const RequestCountry = use('request-country');
const moment = use('moment')

class ClickController {

    async track({ request, params, response }) {

        const ua = request.header('User-Agent')

        const ip = request.ip()

        const requestDevice = DeviceDetector(ua)

        const countryCode = RequestCountry(ip, 'RO')


        if(!ua || !ip || !requestDevice.type || !countryCode){
            return response.status(400).json({message: 'Error occured'})
        }

        let campaignDevice = null

        if(requestDevice.is('desktop')){
            campaignDevice = 'desktop'
        }else if(requestDevice.is('phone') || requestDevice.is('tablet')){
            campaignDevice = 'mobile'
        }

        try {
            const partner = await User.findBy('id', params.partnerId)

            const country = await Country.findBy('code', countryCode)

            const device = await Device.findBy('slug', campaignDevice)

            const campaign = await Campaign.query()
                .where('id', params.campaignId)
                .with('countries')
                .with('devices')
                .first()
            
            if(!campaign){
                return response.status(400).json({message: 'Campaign not found'})
            }

            const dailyClicks = await Click.query()
                .where('campaign_id', campaign.id)
                .whereBetween('created_at', [moment().startOf('day').format("YYYY-MM-DD HH:mm:ss"), moment().endOf('day').format("YYYY-MM-DD HH:mm:ss")])
                .getCount()

            if(campaign.cap <= dailyClicks){
                return response.status(400).json({message: 'Daily Cap reached'})
            }

            if(campaign.is_active == false || campaign.is_removed == true){
                return response.status(400).json({message: 'Campaign is not active or has been removed'})
            }

            const targetCountries = (campaign.toJSON()).countries.map(country => country.id)
            const targetDevices = (campaign.toJSON()).devices.map(device => device.id)

            if(!targetCountries.includes(country.id) || !targetDevices.includes(device.id)){
                return response.status(400).json({message: 'Invalid Targeting'})
            }

            let trackURL = new URL(campaign.url)

            const click = await Click.create({
                user_id: partner.id,
                campaign_id: campaign.id,
                country_id: country.id,
                device_id: device.id,
                cost: campaign.commision,
                ip_address: ip,
            })

            trackURL.searchParams.set('click_id', click.id)

            return response.redirect(trackURL)

        }
        catch (e) {
            return response.status(400).json({message: 'Error occured'})
        }
    }

    async postback({ params, response }) {

        try {
            const click = await Click.findBy('id', params.clickId)

            click.is_lead = true

            await click.save()

            return response.json({message: 'ok', status:'success'})
        }
        catch (e) {
            return response.status(400).json({message: 'Error occured', status:'fail'})
        }
    }
}

module.exports = ClickController
