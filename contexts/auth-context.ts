import { User } from "@supabase/supabase-js";
import { create } from "zustand";

type AuthContextProps = {
  user: User | null;
  setUser: (user: User | null) => void;
};

export const authContext = create<AuthContextProps>((set) => ({
  user: null,
  setUser: (user: User | null) => set(() => ({ user: user })),
}));
