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
    Route.get('test', async () => {
        return Helpers.publicPath() + " " + Helpers.appRoot() + " " + Helpers.resourcesPath() + " " + Helpers.tmpPath();
    })
}).prefix('api');


Route.any('*', 'NuxtController.render')


