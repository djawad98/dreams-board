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

// Inertia
router.get('/home', [AlibabaController, "home"])
router.get('/liverpool', [AlibabaController, "liverpool"])

// RestFul Apis
router.get("/flight", [AlibabaController, "londonFlightPrice"])
router.get("/currencies", [AlibabaController, "currencies"])
router.get("/match-ticket", [AlibabaController, "footballTicket"])
