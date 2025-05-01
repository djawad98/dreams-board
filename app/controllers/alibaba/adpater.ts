import AlibabScrapper from './scrapper.js';
import type {FlightProposal} from './models.js'
import { convertToJalaali } from '../../libs/utility.date.js';
import { NodeCache } from '../../libs/cache/node-cache.js';
import { CacheService } from '../../libs/cache/cache.service.js';


const scrapper = new AlibabScrapper();
const cacheService = new CacheService(new NodeCache());

export default class AlibabaAdapter {
    
  async getLowestFlightIn30Days(): Promise<FlightProposal>{

    const cacheKey = `alibaba-lowest-flight-in-30-days`;
    const cachedFlight = await cacheService.get(cacheKey);
    if(cachedFlight){
      return cachedFlight;
    }

    const [today] = new Date().toISOString().split("T")
    const calendarRequestId = await scrapper.getRequest({adult:1, departureDate: today});
    
    const lowestFlight = await scrapper.getPriceCalendar(calendarRequestId).then(response => {
      return response.result.calenderDataLists
        .filter(day => !day.isDisabled)
        .sort((a,b) => a.price - b.price)[0]
    })

    const [departureDate] = lowestFlight.departureDate.split("T")
    const lowestRequestId = await scrapper.getRequest({adult:1, departureDate: departureDate});

    const result = scrapper.getLodonTehranTickets(lowestRequestId).then(proposals => {
      return proposals.sort((p1,p2) => {
        return (
          p1.prices.reduce((total,price) => total + price.perPassenger,0) -
          p2.prices.reduce((total,price) => total + price.perPassenger,0)
        )
      })?.[0]
    })
    await cacheService.set(cacheKey, result, 3600);

    return result;
  }

  getLowestPriceIn30Days(): Promise<number | undefined>{
    return this.getLowestFlightIn30Days().then(response => response?.prices?.[0]?.perPassenger)
  }

  getFlightLink(departureDate: string){
    return `https://www.alibaba.ir/international/THRALL-LONALL?adult=1&child=0&infant=0&departing=${convertToJalaali(departureDate)}&flightClass=economy&baggages[0]=2`
  }
}