'use strict'

const Category = use('App/Models/Category')
const Country = use('App/Models/Country')
const Device = use('App/Models/Device')

class UtilController {

    async categories({response}){

        try {
            let categories = await Category.all()

            return response.json(categories)

        } catch (error) {
            return response.status(400).json({message: 'Error occured'})
        }
    }

    async countries({response}){

        try {
            let countries = await Country.all()

            return response.json(countries)

        } catch (error) {
            return response.status(400).json({message: 'Error occured'})
        }
    }

    async devices({response}){

        try {
            let devices = await Device.all()

            return response.json(devices)

        } catch (error) {
            return response.status(400).json({message: 'Error occured'})
        }
    }
}

module.exports = UtilController
