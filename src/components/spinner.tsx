export default function Spinner({
  size = 20,
  className,
}: {
  size?: number;
  className?: string;
}) {
  return (
    <div
      style={{
        width: size + "px",
        height: size + "px",
      }}
      className={className}
    >
      <div
        style={{
          width: size + "px",
          height: size + "px",
        }}
        className="relative left-1/2 top-1/2"
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
