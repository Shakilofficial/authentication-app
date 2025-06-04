/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { getCookie, setCookie } from "cookies-next";
import { FieldValues } from "react-hook-form";

const API_BASE_URL = process.env.NEXT_PUBLIC_BASE_API_URL;

const getCookieDomain = () => {
  if (process.env.NODE_ENV === "production") {
    // Use your Vercel app's domain or custom domain
    return (
      process.env.NEXT_PUBLIC_COOKIE_DOMAIN ||
      ".authentication-app-api-chi.vercel.app"
    );
  }
  return ".localhost";
};

export const registerUser = async (userData: FieldValues) => {
  try {
    const res = await fetch(`${API_BASE_URL}/auth/signup`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userData),
      credentials: "include", // Ensure cookies are sent/received
    });
    const result = await res.json();
    if (result?.success) {
      setCookie("token", result.data.accessToken, {
        maxAge: 7 * 24 * 60 * 60,
        path: "/",
        domain: getCookieDomain(),
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
      });
    }
    return result;
  } catch (error: any) {
    throw new Error(error.message || "Failed to sign up");
  }
};

export const signInUser = async (userData: FieldValues) => {
  try {
    const res = await fetch(`${API_BASE_URL}/auth/signin`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userData),
      credentials: "include", // Ensure cookies are sent/received
    });
    const result = await res.json();
    if (result?.success) {
      setCookie("token", result.data.accessToken, {
        maxAge: userData.rememberMe ? 7 * 24 * 60 * 60 : 30 * 60,
        path: "/",
        domain: getCookieDomain(),
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
      });
    }
    return result;
  } catch (error: any) {
    throw new Error(error.message || "Failed to sign in");
  }
};

export const getProfile = async () => {
  const token = getCookie("token");
  if (!token) throw new Error("No token found");
  try {
    const res = await fetch(`${API_BASE_URL}/auth/profile`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
    const result = await res.json();
    if (!result.success)
      throw new Error(result.message || "Failed to fetch profile");
    return result.data;
  } catch (error: any) {
    throw new Error(error.message || "Failed to fetch profile");
  }
};
