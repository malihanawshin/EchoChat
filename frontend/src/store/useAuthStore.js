import { create } from "zustand";

export const useAuthStore = create((set) => ({
  authUser: {name: "Guest", _id: 890, age: 23},
  isLoggedIn: false,

  login: () => {
    console.log("Logging in...");
    set({ isLoggedIn: true });
  },
}));    