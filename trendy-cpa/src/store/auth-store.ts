import { create } from "zustand";

interface AuthState {
  email: string;
  isOnboardingStarted: boolean;
  onboardingStep: number;
  profileDraft: Record<string, unknown>;
  setEmail: (email: string) => void;
  startOnboarding: () => void;
  setStep: (step: number) => void;
  updateDraft: (payload: Record<string, unknown>) => void;
  resetOnboarding: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  email: "",
  isOnboardingStarted: false,
  onboardingStep: 1,
  profileDraft: {},
  setEmail: (email) => set({ email }),
  startOnboarding: () => set({ isOnboardingStarted: true, onboardingStep: 2 }),
  setStep: (step) => set({ onboardingStep: step }),
  updateDraft: (payload) => set((state) => ({ profileDraft: { ...state.profileDraft, ...payload } })),
  resetOnboarding: () => set({ isOnboardingStarted: false, onboardingStep: 1, profileDraft: {}, email: "" })
}));
