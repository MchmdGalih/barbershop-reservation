export interface ReservationInput {
  userId: string;
  outletId: string;
  barberId: string;
  startAt: Date;
  serviceId: string[];
}
