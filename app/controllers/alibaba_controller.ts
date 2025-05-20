import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'
import AlibabaAdapter from './alibaba/adpater.js'
import { PuppeteerScrapper } from '../libs/puppeteer.js'

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


// 0:{"a":"$@1","f":"","b":"locXr6LNEgOwQH_XSKgL1"}
// 1:{"pagination":{"page":1,"pageSize":50,"count":4,"next":null,"previous":null},"events":[{"id":305828,"name":"Liverpool vs Crystal Palace","slug":"liverpool-vs-crystal-palace-tickets","parents":"None","dateMoment":"2025-05-25 16:00:00","startsFrom":675,"avgValue":2590,"priceTrend":"up","maxValue":28159,"isTBA":false,"country":"United Kingdom","city":"Liverpool","venue":"Anfield","venueUrl":"anfield-tickets","mainPerformer":81,"mainPerformerName":"Liverpool","secondPerformer":83,"secondPerformerName":"Crystal Palace"},{"id":370738,"name":"Liverpool vs AC Milan | Friendly Match","slug":"liverpool-vs-ac-milan-friendly-match-kai-tak-sports-park-26-07-2025-tickets","parents":"None","dateMoment":"2025-07-26 19:30:00","startsFrom":5000,"avgValue":5000,"priceTrend":"up","maxValue":5000,"isTBA":false,"country":"Hong Kong","city":null,"venue":"Kai Tak Sports Park","venueUrl":null,"mainPerformer":81,"mainPerformerName":"Liverpool","secondPerformer":148,"secondPerformerName":"AC Milan"},{"id":369634,"name":"Liverpool vs Yokohama F. Marinos","slug":"liverpool-vs-yokohama-fmarinos-friendly-matches-nissan-stadium-30-07-2025-tickets","parents":"None","dateMoment":"2025-07-30 19:30:00","startsFrom":0,"avgValue":0,"priceTrend":"up","maxValue":0,"isTBA":false,"country":"Japan","city":"Yokohama","venue":"Nissan Stadium","venueUrl":null,"mainPerformer":81,"mainPerformerName":"Liverpool","secondPerformer":2387,"secondPerformerName":"Yokohama F. Marinos"},{"id":345685,"name":"FA Community Shield 2025: Liverpool vs Crystal Palace","slug":"fa-community-shield-tickets","parents":"None","dateMoment":"2025-08-09 00:00:00","startsFrom":207,"avgValue":433,"priceTrend":"up","maxValue":11856,"isTBA":false,"country":"United Kingdom","city":"London","venue":"Wembley Stadium","venueUrl":"wembley-stadium-tickets","mainPerformer":81,"mainPerformerName":"Liverpool","secondPerformer":83,"secondPerformerName":"Crystal Palace"}]}
