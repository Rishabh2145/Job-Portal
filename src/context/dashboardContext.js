"use client";
import { createContext, useContext, useState } from "react";

const DashBoardContext = createContext();

export const DashBoardProvider = ({ children }) => {
  const [side, showSide] = useState(false);
 
  return (
    <DashBoardContext.Provider value={{ side, showSide }}>
      {children}
    </DashBoardContext.Provider>
  );
};

export const useDashBoardContext = () => useContext(DashBoardContext);