'use strict'

const User = use('App/Models/User');
const Role = use('Role');

class AuthController {
    async register({request, auth, response}) {
        let {username,email, password, role} = request.all();

        try{
            let userRole = await Role.findByOrFail('slug', role)

            let user = await User.create({
                username: username,
                email: email,
                password: password
            })

            await user.roles().attach([userRole.id])

            //generate token for user;
            let token = await auth.generate(user)

            Object.assign(user, token)
            Object.assign(user, {role: userRole.slug})

            return response.json(user)
        }
        catch (e) {
            return response.status(400).json({message: 'Something went wrong'})
        }
    }

    async login({request, auth, response}) {

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

    async me({auth, response}) {

        try {

            let user = await auth.getUser()

            let userRole = await user.getRoles()
            
            Object.assign(user, {role: userRole[0]})
    
            return response.json(user)
        }
        catch (e) {
            return response.status(400).json({message: 'Invalid JWT'})
        }
    }

}

module.exports = AuthController
