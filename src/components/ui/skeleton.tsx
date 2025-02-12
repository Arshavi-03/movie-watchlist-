// components/ui/skeleton.tsx
import { cn } from "../../lib/utils"

function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "animate-pulse rounded-md bg-purple-100/10",
        className
      )}
      {...props}
    />
  )
}

export { Skeleton }