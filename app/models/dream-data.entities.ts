export interface DreamData {
  flight: {
    from: string,
    to: string,
    date: string,
    price: number, // in Iranian Rial
    agency: string,
    link: string
  },
  matchTicket: {
    teams: string,
    venue: string,
    date: string,
    priceEuro: number, // in Euro
    priceRial: number // in Iranian Rial
  },
  hotel: {
    name: string,
    location: string,
    rating: string,
    pricePerNight: number, // in Iranian Rial
    nights: number,
    totalPrice: number
  }
}

interface Matches {
  pagination: {
    page: number;
    pageSize: number;
    count: number;
    next: null | string;
    previous: null | string;
  };
  events: Match[];
}

interface Match {
  id: number;
  name: string;
  slug: string;
  parents: string;
  dateMoment: string;
  startsFrom: number;
  avgValue: number;
  priceTrend: "up" | "down";
  maxValue: number;
  isTBA: boolean;
  country: string;
  city: string | null;
  venue: string;
  venueUrl: string | null;
  mainPerformer: number;
  mainPerformerName: string;
  secondPerformer: number;
  secondPerformerName: string;
}

export interface SeatPickFootballTicketResponse {
  0: {
    a: string;
    f: string;
    b: string;
  };
  1: Matches;
}