'use strict'
/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const Click = use('App/Models/Click')
const Campaign = use('App/Models/Campaign')
const moment = use('moment')


class ClickTargeting {
  /**
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Function} next
   */
  async handle ({ params, response }, next) {
    // call next to advance the request

    const campaign = await Campaign.query()
      .where('id', params.campaignId)
      .with('countries')
      .with('devices')
      .first()

    const dailyClicks = await Click.query()
        .where('user_id', params.partnerId)
        .whereBetween('created_at', [moment().startOf('day').format("YYYY-MM-DD HH:mm:ss"), moment().endOf('day').format("YYYY-MM-DD HH:mm:ss")])
        .getCount()

    if(campaign.cap >= dailyClicks){
        return response.status(400).json({message: 'Daily Cap reached'})
    }

    if(campaign.is_active == false || campaign.is_removed == true){
        return response.status(400).json({message: 'Campaign is not active or has been removed'})
    }

    await next()
  }
}

module.exports = ClickTargeting
