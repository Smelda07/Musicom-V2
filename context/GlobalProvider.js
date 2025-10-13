import React, { createContext, useState, useContext } from "react";

const GlobalContext = createContext(null);

export default function GlobalProvider({ children }) {
  const [user, setUser] = useState({
    id: "test-user",
    role: "musician",
    email: "test@musicom.dev",
  });

  const [loading, setLoading] = useState(false);

  const isLogged = !!user;

  const loginAs = (userData) => {
    setUser(userData);
  };

  return (
    <GlobalContext.Provider value={{ user, setUser, loginAs, loading, setLoading, isLogged }}>
      {children}
    </GlobalContext.Provider>
  );
}

export const useGlobalContext = () => useContext(GlobalContext);
