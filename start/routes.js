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
    Route.get('network/campaigns', 'NetworkController.allCampaigns')
    Route.get('network/campaign/:campaignId', 'NetworkController.findCampaign')
    Route.delete('network/campaign/:campaignId', 'NetworkController.deleteCampaign')
    Route.get('network/clicks', 'NetworkController.clicks')
    Route.get('network/click/:clickId', 'NetworkController.findClick')
    
}).prefix('api').middleware(['auth', 'is:network']);

Route.group('advertiser', () => {
    //advertiser
    Route.post('advertiser/campaign', 'AdvertiserController.createCampaign').validator("StoreCampaign");
    Route.patch('advertiser/campaign/:campaignId', 'AdvertiserController.updateCampaign').validator("UpdateCampaign");
    Route.get('advertiser/campaigns', 'AdvertiserController.allCampaigns')
    Route.get('advertiser/campaign/:campaignId', 'AdvertiserController.findCampaign')
    Route.delete('advertiser/campaign/:campaignId', 'AdvertiserController.deleteCampaign')
    Route.patch('advertiser/campaign/status/:campaignId', 'AdvertiserController.updateCampaignStatus')
    Route.get('advertiser/clicks', 'AdvertiserController.clicks')
    Route.get('advertiser/click/:clickId', 'AdvertiserController.findClick')
    
}).prefix('api').middleware(['auth', 'is:advertiser']);


Route.any('*', 'NuxtController.render')


