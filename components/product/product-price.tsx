import { formatPrice } from "@/lib/utils";

export function ProductPrice({
  price,
  compareAtPrice,
}: {
  price: number;
  compareAtPrice?: number;
}) {
  return (
    <div className="flex items-center gap-2">
      <span className="text-sm text-ink">{formatPrice(price)}</span>
      {compareAtPrice && (
        <span className="text-xs text-ink-soft line-through">
          {formatPrice(compareAtPrice)}
        </span>
      )}
    </div>
  );
}
