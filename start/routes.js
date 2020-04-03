'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/guides/routing
|
*/

const Route = use('Route')
const Helpers = use('Helpers')

Route.group('auth', () => {
    //Network auth
    Route.post('auth/register', 'AuthController.register').validator("StoreUser")
    Route.post('auth/login', 'AuthController.login').validator("AuthUser");
    Route.get('auth/me', 'AuthController.me').middleware('auth')
    Route.patch('auth/user', 'AuthController.updateUser').middleware(['auth', 'verifyPassword']).validator("UpdateUser")

}).prefix('api');

Route.group('utils', () => {
    //utils
    Route.get('util/categories', 'UtilController.categories')
    Route.get('util/countries', 'UtilController.countries')
    Route.get('util/devices', 'UtilController.devices')

}).prefix('api').middleware('auth');

Route.group('network', () => {
    //network administrator 
    Route.get('network/campaigns', 'NetworkController.getCampaigns')
    Route.get('network/campaign/:campaignId', 'NetworkController.findCampaign')
    Route.delete('network/campaign/:campaignId', 'NetworkController.deleteCampaign')
    Route.get('network/clicks', 'NetworkController.getClicks')
    Route.get('network/stats', 'NetworkController.statsCount')
    Route.get('network/partners', 'NetworkController.getPartners')
    Route.get('network/advertisers', 'NetworkController.getAdvertisers')
    Route.patch('network/user/status/:userId', 'NetworkController.updateUserStatus')
    
}).prefix('api').middleware(['auth', 'is:administrator']);

Route.group('advertiser', () => {
    //advertiser
    Route.post('advertiser/campaign', 'AdvertiserController.createCampaign').validator("StoreCampaign");
    Route.patch('advertiser/campaign/:campaignId', 'AdvertiserController.updateCampaign').validator("UpdateCampaign");
    Route.get('advertiser/campaigns', 'AdvertiserController.getCampaigns')
    Route.get('advertiser/campaign/:campaignId', 'AdvertiserController.findCampaign')
    Route.delete('advertiser/campaign/:campaignId', 'AdvertiserController.deleteCampaign')
    Route.patch('advertiser/campaign/status/:campaignId', 'AdvertiserController.updateCampaignStatus')
    Route.get('advertiser/clicks', 'AdvertiserController.getClicks')
    Route.get('advertiser/click/:clickId', 'AdvertiserController.findClick')
    
}).prefix('api').middleware(['auth', 'is:advertiser']);

Route.group('partner', () => {
    //partner
    Route.get('partner/campaigns', 'PartnerController.getCampaigns')
    Route.get('partner/campaign/:campaignId', 'PartnerController.findCampaign')
    Route.get('partner/clicks', 'PartnerController.getClicks')
    
}).prefix('api').middleware(['auth', 'is:partner']);

Route.group('track', () => {
    //Track and postback
    Route.get('track/:partnerId/:campaignId', 'ClickController.track')
    Route.post('postback/:campaignId/:clickId', 'ClickController.postback')

}).prefix('api');

Route.any('*', 'NuxtController.render')


