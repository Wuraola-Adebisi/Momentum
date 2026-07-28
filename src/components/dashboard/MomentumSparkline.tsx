import React from "react";

interface MomentumSparklineProps {
  className?: string;

  data?: number[];
}

const DECORATIVE_POINTS: [number, number][] = [
  [0, 60],
  [20, 52],
  [40, 55],
  [60, 38],
  [80, 42],
  [100, 24],
  [120, 30],
  [140, 12],
];

function toPoints(data: number[] | undefined): [number, number][] {
  if (!data || data.length < 2) return DECORATIVE_POINTS;

  const max = Math.max(...data, 1);
  const min = Math.min(...data, 0);
  const range = max - min || 1;
  const step = 140 / (data.length - 1);

  return data.map((value, i) => {
    const x = i * step;
    const y = 8 + (1 - (value - min) / range) * 54;
    return [x, y];
  });
}

export const MomentumSparkline: React.FC<MomentumSparklineProps> = ({
  className,
  data,
}) => {
  const points = toPoints(data);

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