/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import AlibabaController from '#controllers/alibaba_controller'
import router from '@adonisjs/core/services/router'
router.get('/', [AlibabaController, "lowestFlight"])