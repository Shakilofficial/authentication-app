/* eslint-disable @typescript-eslint/no-unused-vars */

"use client";
import { AuthContext, AuthContextType } from "@/context/AuthContext";
import { getProfile, signInUser } from "@/services/authService";
import { setCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import { ReactNode, useEffect, useState } from "react";
import { FieldValues } from "react-hook-form";

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<AuthContextType["user"]>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const verifyToken = async () => {
      try {
        const profile = await getProfile();
        setUser({ username: profile.username, shopNames: profile.shopNames });
      } catch (error) {
        setUser(null);
        setCookie("token", "", {
          maxAge: -1,
          path: "/",
          domain:
            process.env.NODE_ENV === "production"
              ? process.env.NEXT_PUBLIC_COOKIE_DOMAIN ||
                ".authentication-app-api-chi.vercel.app"
              : ".localhost",
        });
      } finally {
        setIsLoading(false);
      }
    };
    verifyToken();
  }, []);

  const login = async (data: FieldValues) => {
    const result = await signInUser(data);
    if (result.success) {
      setUser({ username: result.data.username, shopNames: result.data.shops });
      router.push("/dashboard");
    } else {
      throw new Error(result.message || "Login failed");
    }
  };

  const logout = () => {
    setUser(null);
    setCookie("token", "", {
      maxAge: -1,
      path: "/",
      domain:
        process.env.NODE_ENV === "production"
          ? process.env.NEXT_PUBLIC_COOKIE_DOMAIN ||
            ".authentication-app-api-chi.vercel.app"
          : ".localhost",
    });
    router.push("/signin");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};
