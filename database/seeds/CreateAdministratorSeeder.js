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
    const roleAdministrator = new Role()
    roleAdministrator.name = 'Administrator'
    roleAdministrator.slug = 'administrator'
    roleAdministrator.description = 'manage administrator privileges'
    await roleAdministrator.save()

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

    const administrator = await User.create({
      username: 'administrator',
      email: 'administrator@test.com',
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

    await administrator.roles().attach([roleAdministrator.id])

    await partner.roles().attach([rolePartner.id])

    await advertiser.roles().attach([roleAdvertiser.id])
  }
}

module.exports = CreateAdministratorSeeder
