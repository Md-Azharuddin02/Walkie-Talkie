import React, { useState, useEffect, useContext } from "react";
import { Navigate } from "react-router-dom";
import { Store } from "../Store/Store";

export default function TokenAuthenticate({ children }) {
  const { setUser } = useContext(Store);
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);

  
// const isProduction = import.meta.env.MODE === "production";

const API_BASE_URL = "https://walkie-talkie-backend-25gu.onrender.com"

useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/user`, {
          credentials: "include",
        })
        if (!response.ok) {
          throw new Error("Not authenticated");
        }

        const userData = await response.json();
        console.log("User data:", userData);
        setUser(userData);
        setAuthenticated(true);
      } catch (error) {
        console.error("Authentication check failed:", error);
        setAuthenticated(false);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, [API_BASE_URL, setUser]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!authenticated) {
    return <Navigate to="/register" replace />;
  }

  return <>{children}</>;
}