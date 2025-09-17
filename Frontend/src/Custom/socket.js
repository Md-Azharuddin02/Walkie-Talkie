import { io } from "socket.io-client";
export const socket = io("http://localhost:5804",
  {
    autoConnect: false,         // we will connect after auth
    withCredentials: true,
    transports: ["websocket"],  // optional but helps in dev
  }
);