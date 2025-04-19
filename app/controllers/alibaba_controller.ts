import { inject } from '@adonisjs/core';
import type { HttpContext } from '@adonisjs/core/http'
import AlibabaAdapter from './alibaba/adpater.js';

export default class AlibabaController {
    @inject()
    async lowestFlight({inertia}: HttpContext, AlibabaAdapter: AlibabaAdapter){
        return inertia.render('home', {flight: await AlibabaAdapter.getLowestFlightIn30Days()});
    }

    @inject()
    async lowestPrice({response}: HttpContext, AlibabaAdapter: AlibabaAdapter){
        return response.send(await AlibabaAdapter.getLowestPriceIn30Days());
    }
}