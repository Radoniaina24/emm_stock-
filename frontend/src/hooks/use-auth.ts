import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { useNavigate } from "react-router-dom"

import * as authApi from "@/api/auth"
import { ApiError } from "@/lib/api"
import { useAuthStore } from "@/stores/auth-store"
import type { LoginPayload } from "@/types/auth"

export const authKeys = {
  me: ["auth", "me"] as const,
}

export function useMeQuery() {
  const setUser = useAuthStore((s) => s.setUser)
  const clear = useAuthStore((s) => s.clear)
  const status = useAuthStore((s) => s.status)

  return useQuery({
    queryKey: authKeys.me,
    queryFn: async () => {
      try {
        const user = await authApi.getMe()
        setUser(user)
        return user
      } catch (error) {
        if (error instanceof ApiError && error.status === 401) {
          clear()
          return null
        }
        clear()
        throw error
      }
    },
    staleTime: 5 * 60 * 1000,
    retry: false,
    enabled: status === "idle" || status === "authenticated",
  })
}

export function useLoginMutation() {
  const queryClient = useQueryClient()
  const setUser = useAuthStore((s) => s.setUser)

  return useMutation({
    mutationFn: (payload: LoginPayload) => authApi.login(payload),
    onSuccess: (user) => {
      setUser(user)
      queryClient.setQueryData(authKeys.me, user)
    },
  })
}

export function useLogoutMutation() {
  const queryClient = useQueryClient()
  const clear = useAuthStore((s) => s.clear)
  const navigate = useNavigate()

  return useMutation({
    mutationFn: () => authApi.logout(),
    onSettled: () => {
      clear()
      queryClient.setQueryData(authKeys.me, null)
      queryClient.clear()
      navigate("/login", { replace: true })
    },
  })
}

/** Facade compatible with the former AuthContext API */
export function useAuth() {
  const user = useAuthStore((s) => s.user)
  const status = useAuthStore((s) => s.status)
  const loginMutation = useLoginMutation()
  const logoutMutation = useLogoutMutation()

  return {
    user,
    status,
    isAuthenticated: status === "authenticated",
    isLoading: status === "idle",
    login: async (email: string, password: string) => {
      await loginMutation.mutateAsync({ email, password })
    },
    logout: () => {
      logoutMutation.mutate()
    },
    isLoggingIn: loginMutation.isPending,
    isLoggingOut: logoutMutation.isPending,
  }
}
