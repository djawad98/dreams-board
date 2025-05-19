import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'
import AlibabaAdapter from './alibaba/adpater.js'
import { PuppeteerScrapper } from '../libs/puppeteer.js'
import { DreamData } from '#models/dream-data.entities'

export default class AlibabaController {
  @inject()
  async home({ inertia }: HttpContext) {
    return inertia.render('home');
  }

  async liverpool({ inertia }: HttpContext) {
    return inertia.render('football')
  }
  
  @inject()
  async londonFlightPrice({ response }: HttpContext, AlibabaAdapter: AlibabaAdapter) {
    return await AlibabaAdapter.getLowestFlightIn30Days();
  }

  @inject()
  async lowestPrice({ response }: HttpContext, AlibabaAdapter: AlibabaAdapter) {
    return response.send(await AlibabaAdapter.getLowestPriceIn30Days())
  }

  async currencies() {
    return await PuppeteerScrapper.getCurrencyPriceInIRT();
  }

  async footballTicket() {
    return await PuppeteerScrapper.getFootballTicketPriceInIRT();
  }


}
