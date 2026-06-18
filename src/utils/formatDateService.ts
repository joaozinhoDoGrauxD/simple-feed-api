import { Month, Weekday } from "@/enums/DateEnum";

export const formatPublishedDate = (dateString: string): string => {
  if (!dateString) return "";
  const parts = dateString.split(" ");
  if (parts.length < 5) return dateString; // Fallback se o formato for inesperado

  const weekDayRaw = (parts[0] || "").replace(",", "") as keyof typeof Weekday;
  const day = parts[1] || "";
  const monthRaw = (parts[2] || "") as keyof typeof Month;
  const year = parts[3] || "";
  const time = parts[4] || "";

  const weekDay = Weekday[weekDayRaw] || weekDayRaw;
  const month = Month[monthRaw] || monthRaw;

  return `Postado em ${day} de ${month} em uma ${weekDay} de ${year} às ${time}`;
};
