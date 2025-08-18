import React, { useState, useEffect, useContext } from "react";
import { Navigate } from "react-router-dom";
import { Store } from "../Store/Store";
import { config } from "../../config";

export default function TokenAuthenticate({ children }) {
  const { setUser } = useContext(Store);
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);

useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch(`${config.apiBase}/api/user`, {
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
