// import type { HttpContext } from '@adonisjs/core/http'

import { SeatPickFootballTicketResponse } from "#models/dream-data.entities";
import apiFetch from "../libs/fetch.js";

export default class FootballMatchesController {
    liverpoolFootballTickets() {
        return apiFetch<string>("https://seatpick.com/liverpool-tickets", { method: 'POST', body: `[86,{"page":1,"locale":"en-US","pageSize":50}]` })
            .then(response => {
                console.log(response)
                const jsonedResponse: SeatPickFootballTicketResponse = JSON.parse(`{${response}}`)
                return jsonedResponse[1].events[0].startsFrom;
            })
    }
}