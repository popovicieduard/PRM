'use strict'

/*
|--------------------------------------------------------------------------
| CreateAdministratorSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const User = use('App/Models/User');
const Role = use('Role')

class CreateAdministratorSeeder {
  async run () {
    const roleNetwork = new Role()
    roleNetwork.name = 'Network'
    roleNetwork.slug = 'network'
    roleNetwork.description = 'manage network privileges'
    await roleNetwork.save()

    const roleAdvertiser = new Role()
    roleAdvertiser.name = 'Advertiser'
    roleAdvertiser.slug = 'advertiser'
    roleAdvertiser.description = 'manage advertiser privileges'
    await roleAdvertiser.save()

    const rolePartner = new Role()
    rolePartner.name = 'Partner'
    rolePartner.slug = 'partner'
    rolePartner.description = 'manage partner privileges'
    await rolePartner.save()

    const network = await User.create({
      username: 'network',
      email: 'network@test.com',
      password: 'testtest',
    })
    const partner = await User.create({
      username: 'partner',
      email: 'partner@test.com',
      password: 'testtest',
    })
    const advertiser = await User.create({
      username: 'advertiser',
      email: 'advertiser@test.com',
      password: 'testtest',
    })
    await network.roles().attach([roleNetwork.id])
    await partner.roles().attach([rolePartner.id])
    await advertiser.roles().attach([roleAdvertiser.id])
  }
}

module.exports = CreateAdministratorSeeder
