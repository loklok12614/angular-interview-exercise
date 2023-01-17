export interface FlightSearch{
    scheduledDepartureCity: string;
    scheduledArrivalCity: string;
    scheduledDepartureDate: string;
    includeCancelledFlights: boolean;
    includeDepartedFlights: boolean;
}