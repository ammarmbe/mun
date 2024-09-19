import { getUser } from "@/utils/auth/user";
import { getCompletedInterviews } from "@/data/interviews";
import CompletedCard from "@/components/completed-card";

export default async function Completed() {
  const user = await getUser();

  if (!user) {
    return (
      <div className="flex flex-col gap-5 md:col-span-2 xl:col-span-1">
        <h3 className="text-xl font-semibold">Completed</h3>
        <div className="flex flex-grow flex-col items-center justify-center">
          <h1 className="text-xl font-semibold">You are not logged in</h1>
          <p className="mt-1 text-sm font-medium text-secondary">
            Please log in to view your interviews
          </p>
        </div>
      </div>
    );
  }

  const data = await getCompletedInterviews({
    council: user.council,
  });

  if (!data.length) {
    return (
      <div className="flex flex-col gap-5 md:col-span-2 xl:col-span-1">
        <h3 className="text-xl font-semibold">Completed</h3>
        <div className="flex flex-grow flex-col items-center justify-center">
          <h1 className="text-xl font-semibold">No completed interviews</h1>
          <p className="mt-1 text-center text-sm font-medium text-secondary">
            You haven&apos;t completed any interviews (yet)
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-5 md:col-span-2 xl:col-span-1">
      <h3 className="text-xl font-semibold">Completed</h3>
      <div className="relative flex-grow">
        <div className="inset-0 flex flex-col gap-4 overflow-auto md:absolute">
          {data.map((interview) => (
            <CompletedCard
              interview={interview}
              key={interview.id}
              user={user}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
