import { discountPercent, formatINR } from "@/lib/format";
import { cn } from "@/lib/cn";

type Props = {
  mrp: number;
  salePrice: number;
  discount?: number;
  size?: "sm" | "md" | "lg";
  className?: string;
};

export function PriceBlock({ mrp, salePrice, discount, size = "md", className }: Props) {
  const off = discount ?? discountPercent(mrp, salePrice);
  const showStrike = mrp > salePrice;

  return (
    <div className={cn("flex flex-wrap items-baseline gap-2", className)}>
      <span
        className={cn(
          "font-semibold text-ink",
          size === "sm" && "text-sm",
          size === "md" && "text-base",
          size === "lg" && "text-2xl",
        )}
      >
        {formatINR(salePrice)}
      </span>
      {showStrike ? (
        <span className={cn("text-ink-soft/60 line-through", size === "lg" ? "text-base" : "text-sm")}>
          {formatINR(mrp)}
        </span>
      ) : null}
      {off > 0 ? (
        <span className="text-xs font-bold text-pink">-{off}%</span>
      ) : null}
    </div>
  );
}
