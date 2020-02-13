'use strict'

const Campaign = use('App/Models/Campaign')
const Category = use('App/Models/Category')
const Country = use('App/Models/Country')
const Device = use('App/Models/Device')


class AdvertiserController {

    async createCampaign({request, auth, response}) {
        let {form} = request.all();

        let user = await auth.getUser()        

        try {
            const campaign_categories = (await Category.query().whereIn('slug', form.categories ).fetch()).toJSON().map(category => category.id)

            const campaign_countries = (await Country.query().whereIn('code', form.countries ).fetch()).toJSON().map(country => country.id)

            const campaign_devices = (await Device.query().whereIn('slug', form.devices ).fetch()).toJSON().map(device => device.id)

            const campaign = Campaign.create({
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

    async allCampaigns({request, auth, response}) {

        let {email, password} = request.all();

        try {
            const token = await auth.attempt(
                email,
                password
            )

            let user = await User.findBy('email', email)

            let userRole = await user.getRoles()
            
            Object.assign(user, token)
            Object.assign(user, {role: userRole[0]})
    
            return response.json(user)
        }
        catch (e) {
            return response.status(400).json({message: 'Invalid email or password'})
        }
    }

    async findCampaign({request, auth, response}) {

        let {email, password} = request.all();

        try {
            const token = await auth.attempt(
                email,
                password
            )

            let user = await User.findBy('email', email)

            let userRole = await user.getRoles()
            
            Object.assign(user, token)
            Object.assign(user, {role: userRole[0]})
    
            return response.json(user)
        }
        catch (e) {
            return response.status(400).json({message: 'Invalid email or password'})
        }
    }
}

module.exports = AdvertiserController
