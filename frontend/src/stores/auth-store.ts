import { create } from "zustand"

import type { User } from "@/types/auth"

type AuthStatus = "idle" | "authenticated" | "unauthenticated"

type AuthState = {
  user: User | null
  status: AuthStatus
  setUser: (user: User | null) => void
  setStatus: (status: AuthStatus) => void
  clear: () => void
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  status: "idle",
  setUser: (user) =>
    set({
      user,
      status: user ? "authenticated" : "unauthenticated",
    }),
  setStatus: (status) => set({ status }),
  clear: () => set({ user: null, status: "unauthenticated" }),
}))
