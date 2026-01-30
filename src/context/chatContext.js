"use client";
import { createContext, useContext, useState } from "react";

const ChatContext = createContext();

export const ChatProvider = ({ children }) => {
  const [side, showSide] = useState(true);
 
  return (
    <ChatContext.Provider value={{ side, showSide }}>
      {children}
    </ChatContext.Provider>
  );
};

export const useChatContext = () => useContext(ChatContext);
