import React, { useState, useEffect, useContext } from "react";
import { Navigate } from "react-router-dom";
import { Store } from "../Store/Store";
import { io } from "socket.io-client";
const socket = io("http://localhost:5804");

export default function TokenAuthenticate({ children }) {
  const { setUser } = useContext(Store);
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);

  
// const isProduction = import.meta.env.MODE === "production";

useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch(`http://localhost:5804/api/user`, {
          credentials: "include",
           mode: 'cors',
        })
        if (!response.ok) {
          throw new Error("Not authenticated");
        }
        const userData = await response.json();

        socket.off("connect");
        socket.on("connect", () => {
          socket.emit("new-connection", { userId: userData._id});
        });

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