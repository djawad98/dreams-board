import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'
import AlibabaAdapter from './alibaba/adpater.js'
import { PuppeteerScrapper } from '../libs/puppeteer.js'
import { DreamData } from '#models/dream-data.entities'

export default class AlibabaController {
  @inject()
  async lowestFlight({ inertia }: HttpContext, AlibabaAdapter: AlibabaAdapter) {
    return inertia.render('home', {
      flight: await AlibabaAdapter.getLowestFlightIn30Days(), 
      currencyPrice: await PuppeteerScrapper.getCurrencyPriceInIRT(),
      football: await PuppeteerScrapper.getFootballTicketPriceInIRT()
  });
}

  @inject()
  async lowestPrice({ response }: HttpContext, AlibabaAdapter: AlibabaAdapter) {
    return response.send(await AlibabaAdapter.getLowestPriceIn30Days())
  }
  
  async liverpool({ inertia }: HttpContext) {
    
    const dreamData: DreamData = {
      flight: {
        from: "Tehran",
        to: "London",
        date: "June 10, 2025",
        price: 150000000, // in Iranian Rial
        agency: "Dream Flights",
        link: "https://dreamflights.example.com"
      },
      hotel: {
        name: "London Grand Hotel",
        location: "Central London",
        rating: "5 Stars",
        pricePerNight: 8500000, // in Iranian Rial
        nights: 5,
        totalPrice: 42500000
      },
      matchTicket: {
        teams: "Arsenal vs Chelsea",
        venue: "Emirates Stadium, London",
        date: "June 15, 2025",
        priceEuro: 120, // in Euro
        priceRial: 6000000 // in Iranian Rial
      }
    }
    return inertia.render('football',dreamData)
  }
}
