"use client";

import { Button } from "@/components/ui/button";
import { AuthContext } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useContext, useState } from "react";

const DashboardPage = () => {
  const { user, logout, isLoading } = useContext(AuthContext);
  const router = useRouter();
  const [showProfile, setShowProfile] = useState(false);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full"></div>
      </div>
    );
  }

  if (!user) {
    router.push("/signin");
    return null;
  }

  const handleLogout = () => {
    if (confirm("Are you sure you want to logout?")) {
      logout();
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="flex justify-end">
        <Button onClick={() => setShowProfile(!showProfile)}>Profile</Button>
      </div>
      {showProfile && (
        <div className="mt-4 bg-white p-6 rounded-lg shadow-lg max-w-md mx-auto">
          <h2 className="text-xl font-bold mb-4">Profile</h2>
          <p className="mb-2">Username: {user.username}</p>
          <h3 className="font-semibold">Shop Names:</h3>
          <ul className="list-disc pl-5">
            {user.shopNames.map((shop) => (
              <li
                key={shop}
                className="cursor-pointer text-green-600 hover:underline"
                onClick={() =>
                  window.location.assign(`http://${shop}.localhost:3000`)
                }
              >
                {shop}
              </li>
            ))}
          </ul>
          <Button onClick={handleLogout} variant="destructive">
            Logout
          </Button>
        </div>
      )}
    </div>
  );
};

export default DashboardPage;
