import { Month, Weekday } from "@/enums/DateEnum";

export const formatPublishedDate = (timestamp: number): string => {
  if (!timestamp) return "";
  const dateObj = new Date(timestamp);
  const weekDayRaw = dateObj.toDateString().split(" ")[0] as keyof typeof Weekday;
  const day = dateObj.getDate().toString();
  const monthRaw = dateObj.toDateString().split(" ")[1] as keyof typeof Month;
  const year = dateObj.getFullYear().toString();
  const time = dateObj.toTimeString().split(" ")[0];

  const weekDay = Weekday[weekDayRaw] || weekDayRaw;
  const month = Month[monthRaw] || monthRaw;

  return `Postado em ${day} de ${month} na ${weekDay} em ${year} às ${time}`;
};
