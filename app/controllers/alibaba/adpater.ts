import AlibabScrapper from './scrapper.js';
import type { FlightProposal } from './models.js'
import { convertToJalaali } from '../../libs/utility.date.js';
import { DreamData } from '#models/dream-data.entities';


const scrapper = new AlibabScrapper();

export default class AlibabaAdapter {

  async getLowestFlightIn30Days(): Promise<DreamData['flight']> {


    const [today] = new Date().toISOString().split("T")
    const calendarRequestId = await scrapper.getRequest({ adult: 1, departureDate: today });

    const lowestFlight = await scrapper.getPriceCalendar(calendarRequestId).then(response => {
      return response.result.calenderDataLists
        .filter(day => !day.isDisabled)
        .sort((a, b) => a.price - b.price)[0]
    })

    const [departureDate] = lowestFlight.departureDate.split("T")
    const lowestRequestId = await scrapper.getRequest({ adult: 1, departureDate: departureDate });

    const result = await scrapper.getLondonTehranTickets(lowestRequestId).then(proposals => {
      return proposals.sort((p1, p2) => {
        return (
          p1.prices.reduce((total, price) => total + price.perPassenger, 0) -
          p2.prices.reduce((total, price) => total + price.perPassenger, 0)
        )
      })?.[0]
    })

    if (result?.leavingFlightGroup) {

      return {
        agency: result.leavingFlightGroup.airlineName,
        date: result.leavingFlightGroup.departureDateTime,
        from: result.leavingFlightGroup.originCityName,
        to: result.leavingFlightGroup.destinationCityName,
        link: this.getFlightLink(result.leavingFlightGroup.departureDateTime),
        price: result.prices?.[0]?.perPassenger
      };
    } else {
      return {
        agency: "NA",
        date: "NA",
        from: "NA",
        to: "NA",
        link: "NA",
        price: -1
      }
    }
  }

  getLowestPriceIn30Days(): Promise<number | undefined> {
    return this.getLowestFlightIn30Days().then(response => response?.price)
  }

  getFlightLink(departureDate: string) {
    return `https://www.alibaba.ir/international/THRALL-LONALL?adult=1&child=0&infant=0&departing=${convertToJalaali(departureDate)}&flightClass=economy&baggages[0]=2`
  }
}