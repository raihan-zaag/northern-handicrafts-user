import * as React from "react"
import { Star } from "lucide-react"
import { cn } from "@/common/lib/utils"


const StarRating = ({ 
  rating = 0, 
  totalStars = 5, 
  size = 16, 
  readonly = true, 
  onRatingChange,
  className,
  allowHalf,
  ref,
  disabled,
  
  ...props 
}) => {
  const [hoverValue, setHoverValue] = React.useState(0)
  const isInteractive = !disabled && onRatingChange

  const handleClick = (rating) => {
    if (isInteractive) {
      onRatingChange(rating)
    }
  }

  const handleMouseEnter = (rating) => {
    if (isInteractive) {
      setHoverValue(rating)
    }
  }

  const handleMouseLeave = () => {
    if (isInteractive) {
      setHoverValue(0)
    }
  }

  const getStarValue = (index) => {
    const starValue = index + 1
    const currentValue = hoverValue || rating
    
    if (currentValue >= starValue) {
      return 'full'
    } else if (allowHalf && currentValue >= starValue - 0.5) {
      return 'half'
    } else {
      return 'empty'
    }
  }

  return (
    <div
      ref={ref}
      className={cn("flex items-center gap-1", className)}
      {...props}
    >
      {Array.from({ length: totalStars }, (_, index) => {
        const starState = getStarValue(index)
        const starValue = index + 1
        
        return (
          <button
            key={index}
            type="button"
            disabled={disabled}
            className={cn(
              "relative transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
              isInteractive && "cursor-pointer hover:scale-110",
              disabled && "cursor-default"
            )}
            onClick={() => handleClick(starValue)}
            onMouseEnter={() => handleMouseEnter(starValue)}
            onMouseLeave={handleMouseLeave}
          >
            <Star
              className={cn(
                size,
                "transition-colors",
                starState === 'full' && "fill-yellow-400 text-yellow-400",
                starState === 'half' && "fill-yellow-400/50 text-yellow-400",
                starState === 'empty' && "fill-none text-gray-300"
              )}
            />
            {starState === 'half' && (
              <Star
                className={cn(
                  size,
                  "absolute inset-0 fill-yellow-400 text-yellow-400",
                  "clip-path-half"
                )}
                style={{
                  clipPath: "polygon(0 0, 50% 0, 50% 100%, 0 100%)"
                }}
              />
            )}
          </button>
        )
      })}
    </div>
  )
}
StarRating.displayName = "StarRating"

export { StarRating }
