import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { AuthTokens, User, UserStoreProps } from "../types";

export const useUserStore = create<UserStoreProps>()(
  persist(
    (set) => ({
      is_auth: false,
      user: null,
      access_token: null,
      refresh_token: null,
      setUser: (payload: User) => set({ is_auth: true, user: payload }),
      updateUser: (payload: User) => set({ user: payload }),
      removeUser: () =>
        set({
          is_auth: false,
          user: null,
          access_token: null,
          refresh_token: null,
        }),
      updateAccessToken: (payload: string) => set({ access_token: payload }),
      updateRefreshToken: (payload: string) => set({ refresh_token: payload }),
      updateTokens: (payload: AuthTokens) =>
        set({
          refresh_token: payload.refresh_token,
          access_token: payload.access_token,
        }),
    }),
    {
      name: "kanban-user-auth",
      partialize: (state) => ({
        is_auth: state.is_auth,
        user: state.user,
        access_token: state.access_token,
        refresh_token: state.refresh_token,
      }),
      storage: createJSONStorage(() => localStorage),
    }
  )
);
