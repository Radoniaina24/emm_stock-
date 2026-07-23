import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"

import * as usersApi from "@/api/users"
import { authKeys } from "@/hooks/use-auth"
import { useAuthStore } from "@/stores/auth-store"
import type { UpdateProfilePayload, User } from "@/types/auth"

function syncUser(user: User) {
  useAuthStore.getState().setUser(user)
}

export function useUpdateProfileMutation() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (payload: UpdateProfilePayload) => usersApi.updateProfile(payload),
    onSuccess: (user) => {
      syncUser(user)
      queryClient.setQueryData(authKeys.me, user)
      toast.success("Profil mis à jour")
    },
    onError: (error: Error) => {
      toast.error(error.message || "Échec de la mise à jour du profil")
    },
  })
}

export function useUploadAvatarMutation() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (file: File) => usersApi.uploadAvatar(file),
    onSuccess: (user) => {
      syncUser(user)
      queryClient.setQueryData(authKeys.me, user)
      toast.success("Avatar mis à jour")
    },
    onError: (error: Error) => {
      toast.error(error.message || "Échec de l'upload de l'avatar")
    },
  })
}

export function useDeleteAvatarMutation() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: () => usersApi.deleteAvatar(),
    onSuccess: (user) => {
      syncUser(user)
      queryClient.setQueryData(authKeys.me, user)
      toast.success("Avatar supprimé")
    },
    onError: (error: Error) => {
      toast.error(error.message || "Échec de la suppression de l'avatar")
    },
  })
}
