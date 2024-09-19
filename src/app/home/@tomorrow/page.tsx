import { getTomorrowsInterviews } from "@/data/interviews";
import { getUser } from "@/utils/auth/user";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import UpcomingCard from "@/components/upcoming-card/upcoming-card";

dayjs.extend(relativeTime);

export default async function Tomorrow() {
  const user = await getUser();

  if (!user) {
    return (
      <div className="flex flex-col gap-5">
        <h3 className="text-xl font-semibold">Tomorrow</h3>
        <div className="flex flex-grow flex-col items-center justify-center">
          <h1 className="text-xl font-semibold">You are not logged in</h1>
          <p className="mt-1 text-sm font-medium text-secondary">
            Please log in to view your interviews
          </p>
        </div>
      </div>
    );
  }

  const data = await getTomorrowsInterviews({
    council: user.council,
  });

  if (!data.length) {
    return (
      <div className="flex flex-col gap-5">
        <h3 className="text-xl font-semibold">Tomorrow</h3>
        <div className="flex flex-grow flex-col items-center justify-center">
          <h1 className="text-xl font-semibold">No interviews tomorrow</h1>
          <p className="mt-1 text-center text-sm font-medium text-secondary">
            You don&apos;t have any interviews scheduled for tomorrow (yet)
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-5">
      <h3 className="text-xl font-semibold">Tomorrow</h3>
      <div className="relative flex-grow">
        <div className="inset-0 flex flex-col gap-4 overflow-auto md:absolute">
          {data.map((interview) => (
            <UpcomingCard interview={interview} key={interview.id} />
          ))}
        </div>
      </div>
    </div>
  );
}
