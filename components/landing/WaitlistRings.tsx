const RING_RADII = [140, 240, 340, 440, 540];

/** People sitting on the rings: [ring radius, angle in degrees]. */
const MEMBER_DOTS: [number, number][] = [
  [240, -38],
  [240, 152],
  [340, 18],
  [340, -146],
  [440, -72],
  [440, 112],
  [540, 40],
];

function polar(radius: number, degrees: number) {
  const radians = (degrees * Math.PI) / 180;
  return { cx: Math.round(radius * Math.cos(radians)), cy: Math.round(radius * Math.sin(radians)) };
}

export default function WaitlistRings() {
  return (
    <svg
      aria-hidden="true"
      viewBox="-580 -580 1160 1160"
      fill="none"
      className="pointer-events-none absolute top-1/2 left-1/2 -z-10 size-[1160px] -translate-x-1/2 -translate-y-1/2 text-accent/10"
    >
      <g stroke="currentColor" strokeWidth={1}>
        {RING_RADII.map((radius) => (
          <circle key={radius} r={radius} />
        ))}
      </g>
      <g fill="currentColor" className="text-accent/25">
        {MEMBER_DOTS.map(([radius, degrees]) => (
          <circle key={`${radius}-${degrees}`} r={5} {...polar(radius, degrees)} />
        ))}
      </g>
    </svg>
  );
}
