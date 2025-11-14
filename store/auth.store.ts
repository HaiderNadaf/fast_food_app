import { getCurrentUser } from "@/lib/appwriter";
import { Models } from "react-native-appwrite";
import { create } from "zustand";

interface AuthState {
  isAuthenticated: boolean;
  user: Models.User<Models.Preferences> | null;
  isLoading: boolean;
}

interface AuthActions {
  setIsAuthenticated: (value: boolean) => void;
  setUser: (user: Models.User<Models.Preferences> | null) => void;
  setIsLoading: (loading: boolean) => void;
  fetchAuthenticatedUser: () => Promise<void>;
}

type AuthStore = AuthState & AuthActions;

const useAuthStore = create<AuthStore>((set) => ({
  isAuthenticated: false,
  user: null,
  isLoading: true,

  setIsAuthenticated: (value) => set({ isAuthenticated: value }),
  setUser: (user) => set({ user }),
  setIsLoading: (value) => set({ isLoading: value }),

  fetchAuthenticatedUser: async () => {
    try {
      set({ isLoading: true });

      const user = await getCurrentUser();

      if (user) {
        set({
          isAuthenticated: true,
          user,
          isLoading: false,
        });
      } else {
        set({
          isAuthenticated: false,
          user: null,
          isLoading: false,
        });
      }
    } catch (error) {
      console.error("fetchAuthenticatedUser error:", error);
      set({
        isAuthenticated: false,
        user: null,
        isLoading: false,
      });
    }
  },
}));

export default useAuthStore;
