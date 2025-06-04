"use client";
import { AuthContext } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useContext } from "react";

const ShopDashboardPage = () => {
  const { user, isLoading } = useContext(AuthContext);
  const router = useRouter();
  const subdomain =
    typeof window !== "undefined" ? window.location.hostname.split(".")[0] : "";

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full"></div>
      </div>
    );
  }

  if (!user || !user.shopNames.includes(subdomain)) {
    router.push("/signin");
    return null;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <h1 className="text-2xl font-bold">This is {subdomain} shop</h1>
    </div>
  );
};

export default ShopDashboardPage;
