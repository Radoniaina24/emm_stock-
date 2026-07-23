import { cn } from "@/lib/utils"
import { getUserInitials, type User } from "@/types/auth"
import { resolveUploadUrl } from "@/lib/api"

type UserAvatarProps = {
  user: Pick<User, "name" | "avatar">
  className?: string
  textClassName?: string
}

export function UserAvatar({ user, className, textClassName }: UserAvatarProps) {
  const url = resolveUploadUrl(user.avatar)
  const initials = getUserInitials(user)

  if (url) {
    return (
      <img
        src={url}
        alt={user.name}
        className={cn("size-full object-cover", className)}
      />
    )
  }

  return <span className={textClassName}>{initials}</span>
}
