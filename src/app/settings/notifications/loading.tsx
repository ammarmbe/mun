import Spinner from "@/components/spinner";

export default function Loading() {
  return (
    <div className="-m-px mt-0 flex flex-grow items-center justify-center rounded-2xl border bg-primary">
      <Spinner size={24} />
    </div>
  );
}
