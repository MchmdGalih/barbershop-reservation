import { endOfDay, startOfDay } from "date-fns";
import { toZonedTime, fromZonedTime } from "date-fns-tz";

export const TIME_ZONE = "Asia/Jakarta";

export const getTodayRangeUTC = (date: Date = new Date()) => {
  const jakartaTime = toZonedTime(date, TIME_ZONE);

  const startDay = startOfDay(jakartaTime);
  const endDay = endOfDay(jakartaTime);

  return {
    startUTC: fromZonedTime(startDay, TIME_ZONE),
    endUTC: fromZonedTime(endDay, TIME_ZONE),
  };
};
