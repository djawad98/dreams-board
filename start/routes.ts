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
import { middleware } from './kernel.js'
import FootballMatchesController from '#controllers/football_matches_controller'

// Inertia
router.get('/home', [AlibabaController, "home"])
router.get('/liverpool', [AlibabaController, "liverpool"])

// RestFul Apis
router.get("/flight", [AlibabaController, "londonFlightPrice"]).use(middleware.cache({ttl: 60}))
router.get("/currencies", [AlibabaController, "currencies"]).use(middleware.cache({ttl: 60}))
router.get("/match-ticket", [FootballMatchesController, "liverpoolFootballTickets"])
// .use(middleware.cache({ttl: 60}))

router.on('/').redirect('/liverpool')