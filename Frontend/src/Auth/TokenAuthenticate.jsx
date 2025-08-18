import React, { useState, useEffect, useContext } from "react";
import { Navigate } from "react-router-dom";
import { Store } from "../Store/Store";

export default function TokenAuthenticate({ children }) {
  const { setUser } = useContext(Store);
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);
 
  const isProduction = import.meta.env.MODE === "production";

const API_BASE_URL = isProduction
  ? "https://walkie-talkie-backend-25gu.onrender.com"
  : "http://localhost:5804";

useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/user`, {
          credentials: "include",
           mode: 'cors',
        })
        const userData = await response.json();
        if (!response.ok) {
          throw new Error("Not authenticated");
        }

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
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!authenticated) {
    return <Navigate to="/register" replace />;
  }

  return <>{children}</>;
}