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