import { $Enums } from "@prisma/client";
import dayjs from "dayjs";

export const getGradeColor = (
  grade: string | undefined | null,
  defaultValue: string,
): string => {
  return ["10", "9", "a", "a-", "a+"].includes(grade?.toLowerCase() || "")
    ? "text-utility-success-700"
    : ["8", "7", "b", "b-", "b+"].includes(grade?.toLowerCase() || "")
      ? "text-utility-success-500"
      : ["6", "5", "c", "c-", "c+"].includes(grade?.toLowerCase() || "")
        ? "text-utility-warning-500"
        : [
              "4",
              "3",
              "2",
              "1",
              "0",
              "d",
              "d-",
              "d+",
              "e",
              "e+",
              "e-",
              "f",
              "f+",
              "f-",
            ].includes(grade?.toLowerCase() || "")
          ? "text-utility-error-500"
          : defaultValue;
};

export const faculties: Record<$Enums.Faculty, string> = {
  ALSUN: "Al-Alsun",
  MASS_COM: "Mass communication",
  CS: "Computer science",
  ENGINEERING: "Engineering",
  BUSINESS: "Business",
  ARCHITECTURE: "Architecture",
  DENTISTRY: "Dentistry",
  PHARMACY: "Pharmacy",
};

export function generateTimes(
  start: string,
  end: string,
  interval: number,
): string[] {
  const times: string[] = [];

  let currentTime = dayjs(`1970-01-01 ${start}`);

  while (!currentTime.isAfter(dayjs(`1970-01-01 ${end}`))) {
    times.push(currentTime.format("HH:mm"));

    currentTime = currentTime.add(interval, "minute");
  }

  return times;
}
