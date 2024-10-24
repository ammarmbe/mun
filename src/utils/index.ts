import { $Enums } from "@prisma/client";

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

export const councilColors = {
  UNSC: "blue",
  ICJ: "green",
  ECOSOC: "red",
  JDC: "yellow",
  ASAM: "brand",
  ODC: "gray",
} as const;

export const subscribe = async (
  userid: string | null | undefined,
): Promise<PushSubscription | null> => {
  if (!userid) return null;

  // check if a service worker is already registered
  let swRegistration = await navigator.serviceWorker.getRegistration();

  if (!swRegistration) {
    swRegistration = await registerServiceWorker();
  }

  await window?.Notification.requestPermission();

  try {
    const options = {
      applicationServerKey: process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY,
      userVisibleOnly: true,
    };

    return await swRegistration.pushManager.subscribe(options);
  } catch (err) {}

  return null;
};

export const registerServiceWorker = async () => {
  return navigator.serviceWorker.register("/service.js");
};
