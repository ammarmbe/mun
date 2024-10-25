import { twMerge } from "tailwind-merge";

export default function Spinner({
  size = 20,
  containerClassName,
  className,
}: {
  size?: number;
  className?: string;
  containerClassName?: string;
}) {
  return (
    <div
      style={{
        width: size + "px",
        height: size + "px",
      }}
      className={containerClassName}
    >
      <div
        style={{
          width: size + "px",
          height: size + "px",
        }}
        className={twMerge("relative left-1/2 top-1/2", className)}
      >
        {Array.from({ length: 10 }).map((_, i) => (
          <div
            key={i}
            style={{
              animation: "spinner 1s linear infinite",
              animationDelay: `-${1 - i * 0.1}s`,
              transform: `rotate(${(i + 1) * 36}deg) translate(146%)`,
            }}
            className="absolute left-[-10%] top-[-3.9%] h-[8%] w-[24%] rounded-[5px] bg-utility-gray-500"
          />
        ))}
      </div>
    </div>
  );
}
