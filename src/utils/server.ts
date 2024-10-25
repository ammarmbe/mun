import dayjs from "dayjs";
import webpush from "web-push";

export const sendNotification = async (interview: {
  subscription: string;
  name: string;
  date?: Date;
  type: "NEW" | "UPCOMING";
}) => {
  if (!interview) {
    console.log("no interview passed");
    return;
  }

  if (!interview.subscription) {
    console.log("no endpoint passed");
    return;
  }

  const payload = JSON.stringify({
    title: interview.type === "NEW" ? "New interview" : "Interview upcoming",
    body:
      interview.type === "NEW"
        ? `You have an interview with ${interview.name}${dayjs().isSame(interview.date, "day") ? " today" : dayjs().add(1, "day").isSame(interview.date, "day") ? " tomorrow" : dayjs(interview.date).format("dddd, MMMM DD")} at ${dayjs(interview.date).format("hh:mm A")}.`
        : `You have an interview with ${interview.name} in 10 minutes.`,
    icon: "/images/icon-192x192.png",
    badge: "/images/badge.png",
  });

  webpush.setVapidDetails(
    "https://tally.ambe.dev",
    process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY as string,
    process.env.VAPID_PRIVATE_KEY as string,
  );

  console.log("sending new interview notification to", interview.subscription);

  return await webpush.sendNotification(
    JSON.parse(interview.subscription),
    payload,
  );
};
