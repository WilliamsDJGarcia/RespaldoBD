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
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.on('/').render('welcome')

Route.get('backup','SettingController.index');
Route.post('backup', 'SettingController.store');
Route.get('backup-mostrar/:id', 'SettingController.show');
Route.put('backup-editar/:id', 'SettingController.update');
Route.delete('backup-eliminar/:id', 'SettingController.destroy');