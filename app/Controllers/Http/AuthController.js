'use strict'

const User = use('App/Models/User');
const Advertiser = use('App/Models/Advertiser');
const Partner = use('App/Models/Partner');


class AuthController {
    async registerUser({request, auth, response}) {

        let user = await User.create(request.all())

        //generate token for user;
        let token = await auth.authenticator('user').generate(user)

        Object.assign(user, token)

        return response.json(user)
    }

    async loginUser({request, auth, response}) {

        let {email, password} = request.all();

        try {
            if (await auth.authenticator('user').attempt(email, password)) {
            let user = await User.findBy('email', email)
            let token = await auth.authenticator('user').generate(user)

            Object.assign(user, token)
            return response.json(user)
            }


        }
        catch (e) {
            return response.json({message: 'You are not registered!'})
        }
    }

    async registerAdvertiser({request, auth, response}) {

        let advertiser = await Advertiser.create(request.all())

        //generate token for advertiser;
        let token = await auth.authenticator('advertiser').generate(advertiser)

        Object.assign(advertiser, token)

        return response.json(advertiser)
    }

    async loginAdvertiser({request, auth, response}) {

        let {email, password} = request.all();

        try {
            if (await auth.authenticator('advertiser').attempt(email, password)) {
            let advertiser = await Advertiser.findBy('email', email)
            let token = await auth.authenticator('advertiser').generate(advertiser)

            Object.assign(advertiser, token)
            return response.json(advertiser)
            }


        }
        catch (e) {
            return response.json({message: 'You are not registered!'})
        }
    }

    async registerPartner({request, auth, response}) {

        let partner = await Partner.create(request.all())

        //generate token for partner;
        let token = await auth.authenticator('partner').generate(partner)

        Object.assign(partner, token)

        return response.json(partner)
    }

    async loginPartner({request, auth, response}) {

        let {email, password} = request.all();

        try {
            if (await auth.authenticator('partner').attempt(email, password)) {
            let partner = await Partner.findBy('email', email)
            let token = await auth.authenticator('partner').generate(partner)

            Object.assign(partner, token)
            return response.json(partner)
            }


        }
        catch (e) {
            return response.json({message: 'You are not registered!'})
        }
    }

}

module.exports = AuthController
