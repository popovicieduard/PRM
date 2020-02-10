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

Route.group('api', () => {
    //Network auth
    Route.post('auth/network/register', 'AuthController.registerUser')
    Route.post('auth/network/login', 'AuthController.loginUser')

    //Advertiser auth
    Route.post('auth/advertiser/register', 'AuthController.registerAdvertiser')
    Route.post('auth/advertiser/login', 'AuthController.loginAdvertiser')

    //Partner auth
    Route.post('auth/partner/register', 'AuthController.registerPartner')
    Route.post('auth/partner/login', 'AuthController.loginPartner')

    Route.get('/me', async function(){
        return 'ok'
    }).middleware(['auth:user'])

}).prefix('api');


Route.any('*', 'NuxtController.render')


