import React from "react";

interface MomentumSparklineProps {
  className?: string;
}

export const MomentumSparkline: React.FC<MomentumSparklineProps> = ({
  className,
}) => {
  const points = [
    [0, 60],
    [20, 52],
    [40, 55],
    [60, 38],
    [80, 42],
    [100, 24],
    [120, 30],
    [140, 12],
  ];

  const pathD = points
    .map(([x, y], i) => (i === 0 ? `M ${x} ${y}` : `L ${x} ${y}`))
    .join(" ");

  const [lastX, lastY] = points[points.length - 1];

  return (
    <svg
      viewBox="0 0 140 70"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d={pathD}
        className="stroke-primary"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx={lastX} cy={lastY} r="3.5" className="fill-primary" />
    </svg>
  );
};
