import { Star } from "lucide-react";

export function ProductRating({
  rating,
  reviewCount,
  size = 13,
}: {
  rating: number;
  reviewCount?: number;
  size?: number;
}) {
  return (
    <div className="flex items-center gap-1.5" aria-label={`Rated ${rating} out of 5`}>
      <div className="flex items-center gap-0.5 text-gold">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            size={size}
            strokeWidth={1.5}
            fill={i < Math.round(rating) ? "currentColor" : "none"}
          />
        ))}
      </div>
      {reviewCount !== undefined && (
        <span className="text-xs text-ink-soft">({reviewCount})</span>
      )}
    </div>
  );
}
