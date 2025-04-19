export interface TehranLondongRespone {
  result: {
    isCompleted:true,
    nextRequestThreshold:500,
    requestId: string,
    proposals: FlightProposal[]
  },
  targetUrl: null,
  success: boolean,
  error: null,
  unauthorizedRequest: boolean,
  __wrapped: boolean,
  __traceId: null
}


export interface FlightProposal {
  uniqueId: string;
  isReservable: boolean;
  providerCode: number;
  providerName: string;
  providerMetaData: string;
  provider: any;
  agencyCode: any;
  proposalId: string;
  total: number;
  totalTax: number;
  isMultiDestination: boolean;
  refundContract: string;
  prices: {
    paxType: number;
    paxTypeText: string | null;
    perPassenger: number;
    total: number;
    count: number;
  }[];
  flightGroups: any[];
  leavingFlightGroup: FlightGroup | null;
  returningFlightGroup: FlightGroup | null;
  isIncludeFareBrand: boolean;
  flightFareBrand: any;
  isCharter: boolean;
  isPoint: boolean;
  unavailableSeat: boolean;
  isRefundable: boolean;
  seat: number;
  displayIndex: number;
  totalDurationMinutes: number;
  ancillaryService: AncillaryService;
  netPrice: number;
  isRealiablePrice: boolean;
  isAppliedVariant: boolean;
  isAlibabaBundle: boolean;
  isMillageSupport: boolean;
  millageInfo: any;
  visaRequirements: any[];
  optionalServices: any;
  promotionDetails: any[];
  cabinBaggage: string;
  proposalStatus: string;
  minCommission: number;
  score: number;
  userVariant: string;
  hasHiddenMarkdown: boolean;
  longReserveSupport: boolean;
}

interface FlightGroup {
  internalId: string;
  airlineName: string;
  airlineNamePersian: string | null;
  origin: string;
  originName: string;
  originPersian: string;
  originCityNamePersian: string;
  originCityName: string;
  destinationCityName: string;
  originCountryName: string;
  destination: string;
  destinationCountryName: string;
  destinationName: string;
  destinationPersian: string;
  destinationCityNamePersian: string;
  durationMin: number;
  numberOfStop: number;
  cabinTypeName: string;
  flightDetails: FlightDetail[];
  departureDateTime: string;
  departureDateTimeWithTimeZone: string;
  arrivalDateTime: string;
  arrivalDateTimeWithTimeZone: string;
  stopDurationTotal: number;
  lowestBaggageAmount: string;
  lowestCabinBaggageAmount: string;
  class: string;
  ancillaryService: AncillaryService;
  flightFareBrand: any;
  baggage: Baggage[];
  cabinBaggage: Baggage[];
  baggageOnPlp: string;
  visaRequirements: any[];
  hiddenMarkdownAmount: any;
}

interface FlightDetail {
  origin: string;
  originName: string;
  originPersian: string;
  originCityNamePersian: string;
  destinationCountryName: string;
  originCountryName: string;
  destinationName: string;
  destinationPersian: string;
  destinationCityNamePersian: string;
  destination: string;
  marketingCarrier: string;
  marketingCarrierName: string;
  operatingCarrier: string;
  flightNumber: string;
  aircraft: string;
  arrivalDateTime: string;
  departureDateTime: string;
  _Class: string;
  stopDurationTotalMin: number;
  baggage: string[];
  cabinBaggage: string[];
  airlineLogo: string;
  airlineName: string;
  flightDuration: number;
  technicalStop: any[];
  airportChange: boolean;
  isTrain: boolean;
  isBus: boolean;
  originCityName: string;
  originCountryNamePersian: string;
  destinationCityName: string;
  destinationCountryNamePersian: string;
}

interface AncillaryService {
  freeTransfer: boolean;
  lowCost: boolean;
  insurance: boolean;
  sponsored: boolean;
  freeCancelation: boolean;
  freePcr: boolean;
}

interface Baggage {
  ageType: number;
  baggageAllowanceAmount: number;
  baggageUnit: string;
  baggagePieceAmount: number;
  origin: string;
  destination: string;
  unknownBaggageInfo: boolean;
}

// {
//   "uniqueId": "202504080345PCPCSAWSTN513246696000246696000",
//   "isReservable": true,
//   "providerCode": 0,
//   "providerName": "",
//   "providerMetaData": "",
//   "provider": null,
//   "agencyCode": null,
//   "proposalId": "NTgxOTQ0NjkwNDQ4NDkyODQ5Ni9kZWRkOWQzMi0yNDkzLTQ2YWEtYThlOS00NWEzMTQ0Zjc2NTM=",
//   "total": 246696000.0,
//   "totalTax": 55860000.0,
//   "isMultiDestination": false,
//   "refundContract": "Systemic",
//   "prices": [
//       {
//           "paxType": 0,
//           "paxTypeText": null,
//           "perPassenger": 246696000.0,
//           "total": 246696000.0,
//           "count": 1
//       }
//   ],
//   "flightGroups": [],
//   "leavingFlightGroup": {
//       "internalId": "202504080345202504081135202504080640202504081335SAWSTN740IQ5131161PCPC0K",
//       "airlineName": "Pegasus",
//       "airlineNamePersian": null,
//       "origin": "IKA",
//       "originName": "Imam Khomeini",
//       "originPersian": "فرودگاه امام خمینی",
//       "originCityNamePersian": "تهران",
//       "originCityName": "Tehran",
//       "destinationCityName": "London",
//       "originCountryName": "Iran",
//       "destination": "STN",
//       "destinationCountryName": "United Kingdom",
//       "destinationName": "London Stansted",
//       "destinationPersian": "فرودگاه استانستد لندن",
//       "destinationCityNamePersian": "لندن",
//       "durationMin": 740,
//       "numberOfStop": 1,
//       "cabinTypeName": "Economy",
//       "flightDetails": [
//           {
//               "origin": "IKA",
//               "originName": "Imam Khomeini",
//               "originPersian": "فرودگاه امام خمینی",
//               "originCityNamePersian": "تهران",
//               "destinationCountryName": "Turkey",
//               "originCountryName": "Iran",
//               "destinationName": "Sabiha Gokcen",
//               "destinationPersian": "فرودگاه صابیحا گوکچن",
//               "destinationCityNamePersian": "استانبول",
//               "destination": "SAW",
//               "marketingCarrier": "PC",
//               "marketingCarrierName": "PC",
//               "operatingCarrier": "PC",
//               "flightNumber": "513",
//               "aircraft": "",
//               "arrivalDateTime": "2025-04-08T06:40:00",
//               "departureDateTime": "2025-04-08T03:45:00",
//               "_Class": "Economy",
//               "stopDurationTotalMin": 0,
//               "baggage": [
//                   "بدون بار"
//               ],
//               "cabinBaggage": [
//                   "3 کیلوگرم"
//               ],
//               "airlineLogo": "https://cdn.alibaba.ir/static/img/airlines/PC.png",
//               "airlineName": "Pegasus",
//               "flightDuration": 205,
//               "technicalStop": [],
//               "airportChange": false,
//               "isTrain": false,
//               "isBus": false,
//               "originCityName": "Tehran",
//               "originCountryNamePersian": "ایران",
//               "destinationCityName": "Istanbul",
//               "destinationCountryNamePersian": "ترکیه"
//           },
//           {
//               "origin": "SAW",
//               "originName": "Sabiha Gokcen",
//               "originPersian": "فرودگاه صابیحا گوکچن",
//               "originCityNamePersian": "استانبول",
//               "destinationCountryName": "United Kingdom",
//               "originCountryName": "Turkey",
//               "destinationName": "London Stansted",
//               "destinationPersian": "فرودگاه استانستد لندن",
//               "destinationCityNamePersian": "لندن",
//               "destination": "STN",
//               "marketingCarrier": "PC",
//               "marketingCarrierName": "PC",
//               "operatingCarrier": "PC",
//               "flightNumber": "1161",
//               "aircraft": "",
//               "arrivalDateTime": "2025-04-08T13:35:00",
//               "departureDateTime": "2025-04-08T11:35:00",
//               "_Class": "Economy",
//               "stopDurationTotalMin": 295,
//               "baggage": [
//                   "بدون بار"
//               ],
//               "cabinBaggage": [
//                   "3 کیلوگرم"
//               ],
//               "airlineLogo": "https://cdn.alibaba.ir/static/img/airlines/PC.png",
//               "airlineName": "Pegasus",
//               "flightDuration": 240,
//               "technicalStop": [],
//               "airportChange": false,
//               "isTrain": false,
//               "isBus": false,
//               "originCityName": "Istanbul",
//               "originCountryNamePersian": "ترکیه",
//               "destinationCityName": "London",
//               "destinationCountryNamePersian": "انگلستان"
//           }
//       ],
//       "departureDateTime": "2025-04-08T03:45:00",
//       "departureDateTimeWithTimeZone": "2025-04-08T03:45:00.0000000+03:30",
//       "arrivalDateTime": "2025-04-08T13:35:00",
//       "arrivalDateTimeWithTimeZone": "2025-04-08T13:35:00.0000000+00:00",
//       "stopDurationTotal": 295,
//       "lowestBaggageAmount": "بدون بار",
//       "lowestCabinBaggageAmount": "3 کیلوگرم",
//       "class": "Economy/Economy",
//       "ancillaryService": {
//           "freeTransfer": false,
//           "lowCost": false,
//           "insurance": false,
//           "sponsored": false,
//           "freeCancelation": false,
//           "freePcr": false
//       },
//       "flightFareBrand": null,
//       "baggage": [
//           {
//               "ageType": 0,
//               "baggageAllowanceAmount": 0,
//               "baggageUnit": "K",
//               "baggagePieceAmount": 0,
//               "origin": "IKA",
//               "destination": "STN",
//               "unknownBaggageInfo": false
//           }
//       ],
//       "cabinBaggage": [
//           {
//               "ageType": 0,
//               "baggageAllowanceAmount": 3,
//               "baggageUnit": "KG",
//               "baggagePieceAmount": 0,
//               "origin": "IKA",
//               "destination": "STN",
//               "unknownBaggageInfo": false
//           }
//       ],
//       "baggageOnPlp": "0 KG",
//       "visaRequirements": [],
//       "hiddenMarkdownAmount": null
//   },
//   "returningFlightGroup": null,
//   "isIncludeFareBrand": false,
//   "flightFareBrand": null,
//   "isCharter": false,
//   "isPoint": false,
//   "unavailableSeat": false,
//   "isRefundable": true,
//   "seat": 9,
//   "displayIndex": 0,
//   "totalDurationMinutes": 740,
//   "ancillaryService": {
//       "freeTransfer": false,
//       "lowCost": false,
//       "insurance": false,
//       "sponsored": false,
//       "freeCancelation": false,
//       "freePcr": false
//   },
//   "netPrice": 0.0,
//   "isRealiablePrice": true,
//   "isAppliedVariant": true,
//   "isAlibabaBundle": false,
//   "isMillageSupport": false,
//   "millageInfo": null,
//   "visaRequirements": [],
//   "optionalServices": null,
//   "promotionDetails": [],
//   "cabinBaggage": "حمل 1 آیتم کوچک (کیف دستی، کیف لپتاپ) تا 3 کیلوگرم داخل کابین مجاز می باشد",
//   "proposalStatus": "Show",
//   "minCommission": 0.0,
//   "score": 98964345.0,
//   "userVariant": "MARGIN-INCREASE2-V2",
//   "hasHiddenMarkdown": false,
//   "longReserveSupport": false
// }



export interface CalendarDataItem {
  price: number;
  departureDate: string;
  returnDate: string | null;
  localPrice: string;
  localDepartureDayName: string;
  localDepartureDate: string;
  localReturnDayName: string;
  localReturnDate: string;
  departurePersianDate: string;
  returnPersianDate: string;
  departureGregorianDate: string;
  returnGregorianDate: string;
  marketingAirlineCodeLeaving: string;
  marketingAirlineCodeReturning: string;
  class: string;
  isDisabled: boolean;
  isEmpty: boolean;
}

export interface CalendarResult {
  calenderDataLists: CalendarDataItem[];
  message: string;
}

export interface CalendarResponse {
  result: CalendarResult;
  targetUrl: string | null;
  success: boolean;
  error: any; // Could be refined if error structure is known
  unauthorizedRequest: boolean;
  __wrapped: boolean;
  __traceId: string;
}
