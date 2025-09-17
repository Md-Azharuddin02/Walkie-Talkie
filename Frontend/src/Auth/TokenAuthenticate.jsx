import React, { useState, useEffect, useContext } from "react";
import { Navigate } from "react-router-dom";
import { Store } from "../Store/Store";
import {socket} from "../Custom/socket"


export default function TokenAuthenticate({ children }) {
  const { user, setUser } = useContext(Store);
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch(`http://localhost:5804/api/user`, {
          credentials: "include",
          mode: "cors",
        });
        if (!response.ok) {
          throw new Error("Not authenticated");
        }

        const userData = await response.json();
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

  useEffect(() => {
    if (!authenticated || !user?.phoneNumber) return;

    if (!socket.connected) socket.connect();

    // when connected, server issues socket.id – then join
    const onConnect = () => {
      socket.emit("join", { userPhoneNumber: user.phoneNumber });
    };

    socket.on("connect", onConnect);

    return () => {
      socket.off("connect", onConnect);
      // optional: socket.disconnect(); // only if you want to end session on unmount
    };
  }, [authenticated, user?.phoneNumber]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!authenticated) {
    return <Navigate to="/register" replace />;
  }

  return <>{children}</>;
}
