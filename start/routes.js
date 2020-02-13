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

}).prefix('api');

Route.group('utils', () => {
    //utils
    Route.get('util/categories', 'UtilController.categories')
    Route.get('util/countries', 'UtilController.countries')
    Route.get('util/devices', 'UtilController.devices')

}).prefix('api').middleware('auth');

Route.group('advertiser', () => {
    //advertiser
    Route.post('advertiser/create-campaign', 'AdvertiserController.createCampaign').validator("StoreCampaign");

}).prefix('api').middleware(['auth', 'is:advertiser']);


Route.any('*', 'NuxtController.render')


