import { Star } from "lucide-react";

type StarRatingProps = {
  rating: number;
  size?: number;
};

export function StarRating({ rating, size = 12 }: StarRatingProps) {
  const maxStar = 5;
  const filledStar = Math.round(rating);
  const emptyStar = maxStar - filledStar;

  return (
    <div className="flex items-center">
      {/* filled star */}
      {Array.from({ length: filledStar }).map((_, i) => (
        <Star key={i} fill="#E55420" size={size} color="#E55420" />
      ))}

      {/* Empty Star */}
      {Array.from({ length: emptyStar }).map((_, i) => (
        <Star key={i} size={size} />
      ))}
    </div>
  );
}
