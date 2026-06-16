import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Header from "./Header";

const ProtectedRoute = () => {
  const { isAuthenticated } = useAuth();
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="bg-gray-900 min-h-screen text-gray-200 font-sans flex flex-col w-full h-screen">
      <Header />
      <main className="flex-1 flex overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
};

export default ProtectedRoute;
