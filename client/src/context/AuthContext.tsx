"use client";

export type AuthContextType = {
  user: { username: string; shopNames: string[] } | null;
  login: (data: FieldValues) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
};

import { createContext } from "react";
import { FieldValues } from "react-hook-form";

export const AuthContext = createContext<AuthContextType>({
  user: null,
  login: async () => {},
  logout: () => {},
  isLoading: false,
});
