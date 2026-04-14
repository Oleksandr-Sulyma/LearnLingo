export default function Icon({ id, width, height, className = "" }) {
  return (
    <svg width={width} height={height} className={className}>
      <use href={`/sprite.svg#${id}`} />
    </svg>
  );
}