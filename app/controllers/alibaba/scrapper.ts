import apiFetch from '../../libs/fetch.js';
import type { CalendarResponse, TehranLondongRespone as TehranLondonRespone } from './models.ts';
export default class AlibabScrapper {
  url = 'https://ws.alibaba.ir/api/v1/flights/international/proposal-requests';
  private headers = {
    'Accept': 'application/json, text/plain, */*',
    'Accept-Language': 'en-US,en;q=0.9,fa;q=0.8',
    'Connection': 'keep-alive',
    'Content-Type': 'application/json',
    'Origin': 'https://www.alibaba.ir',
    'Referer': 'https://www.alibaba.ir/',
    'Sec-Fetch-Dest': 'empty',
    'Sec-Fetch-Mode': 'cors',
    'Sec-Fetch-Site': 'same-site',
    'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/134.0.0.0 Safari/537.36',
    'ab-alohomora': 'oGhwxuEvEfdye4yEKvybX5',
    'ab-channel': 'WEB-NEW,PRODUCTION,CSR,www.alibaba.ir,desktop,Chrome,134.0.0.0,N,N,Mac OS,10.15.7,3.135.6',
    'sec-ch-ua': '"Chromium";v="134", "Not:A-Brand";v="24", "Google Chrome";v="134"',
    'sec-ch-ua-mobile': '?0',
    'sec-ch-ua-platform': '"macOS"',
    'tracing-device': 'N,Chrome,134.0.0.0,N,N,Mac OS',
    'tracing-sessionid': '1743711252046'
  };

  async getRequest(payload: {adult: number, departureDate: string}): Promise<string>{
    const body = JSON.stringify({
      adult: payload.adult,
      child: 0,
      departureDate: payload.departureDate,
      destination: "LONALL",
      flightClass: "economy",
      infant: 0,
      isReIssueRequest: false,
      origin: "IKA",
      userVariant: "MARGIN-INCREASE2-V2"
    });

    const { result } = await apiFetch<{ result: { requestId: string } }>(this.url, { method: 'POST', body, headers: this.headers })
    return result.requestId;
  }

  async getLondonTehranTickets(requestId: string) {
    return apiFetch<TehranLondonRespone>(`${this.url}/${requestId}`, {
      method: 'GET',
      headers: this.headers,
    })
      .then(response => {
        return response.result.proposals.filter(proposal => {
          return proposal.leavingFlightGroup?.baggageOnPlp !== '0 KG'
        })
      })
  }

  async getPriceCalendar(requestId: string): Promise<CalendarResponse> {
   
    const url = `https://ws.alibaba.ir/api/v1/flights/international/proposal/${requestId}/calender`;

    const body = JSON.stringify({
      limit: 50, // this is max 10
      offset: 10, // this is to have more time range
      routeFilters: [
        {
          airlines: [],
          airports: [],
          baggageWeight: { from: 20, to: 39 },
          departureTime:null,
          durationMinutes:null,
          isCharter:null,
          isIncludeFareBrand:null,
          promotions:null,
          requiredVisa:[],
          stops: [],
        }
      ]
    });

    return apiFetch<CalendarResponse>(url, { method: 'POST', body, headers: this.headers })
  }
}