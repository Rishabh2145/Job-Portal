"use client";

import socket from "@/utils/socket";
import { createContext, useEffect, useContext } from "react";

const SocketContext = createContext(null);

export const SocketProvider = ({ children }) => {
  useEffect(() => {
    if (!socket.connected) {
      socket.connect();
    }
    return () => {
      socket.disconnect();
    };
  }, []);
  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
};

export const useSocket = () => useContext(SocketContext);
