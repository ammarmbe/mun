import { getTodaysInterviews } from "@/data/interviews";
import { getUser } from "@/utils/auth/user";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import UpcomingCard from "@/components/upcoming-card/upcoming-card";

dayjs.extend(relativeTime);

export default async function Today() {
  const user = await getUser();

  if (!user) {
    return (
      <div className="flex flex-col gap-5">
        <h2 className="text-xl font-semibold">Up next</h2>
        <div className="flex flex-grow flex-col items-center justify-center">
          <h1 className="text-xl font-semibold">You are not logged in</h1>
          <p className="mt-1 text-sm font-medium text-secondary">
            Please log in to view your interviews
          </p>
        </div>
      </div>
    );
  }

  const data = await getTodaysInterviews({
    council: user.council,
    upcoming: true,
  });

  if (!data.length) {
    return (
      <div className="flex flex-col gap-5">
        <h2 className="text-xl font-semibold">Up next</h2>
        <div className="flex flex-grow flex-col items-center justify-center">
          <h1 className="text-xl font-semibold">No more interviews today</h1>
          <p className="mt-1 text-center text-sm font-medium text-secondary">
            You don&apos;t have any more interviews scheduled for today (yet)
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-5">
      <h2 className="text-xl font-semibold">Up next</h2>
      <UpcomingCard interview={data[0]} upNext />
      <h3 className="text-md font-semibold text-secondary">Today</h3>
      <div className="relative flex-grow">
        <div className="inset-0 flex flex-col gap-4 overflow-auto md:absolute">
          {data.length > 1 ? (
            data
              .slice(1)
              .map((interview) => (
                <UpcomingCard interview={interview} key={interview.id} />
              ))
          ) : (
            <div className="flex flex-grow flex-col items-center justify-center">
              <p className="text-center text-sm font-medium text-secondary">
                No more interviews today (yet)
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
