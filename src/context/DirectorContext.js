import { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "./AuthProvider";
import { createLapseRequest, createPeriodRequest } from "../api/director";

const DirectorContext = createContext();

export const useDirectors = () => {
  const context = useContext(DirectorContext);

  if (!context) {
    throw new Error("useDirectors must be used within a DirectorProvider");
  }
  return context;
}

export function DirectorsProvider({ children }) {
  const [directors] = useState([]);
  const { user } = useAuth()
  const [period, setPeriod] = useState([]);

  const addPeriod = async (data) => {
    try {
      const res = await createPeriodRequest(user.token, data);
      if(res.status === 200)
      {
        setPeriod(res.data)
      }
    } catch (error) {
      console.log(error);
    }
  };

  const addLapse = async (data) => {
    try {
      const res = await createLapseRequest(user.token, data);
      if(res.status === 200)
      {
        setPeriod(res.data)
        return res.data;
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <DirectorContext.Provider value={{
      directors,
      addPeriod,
      addLapse,
      period
    }}>
      {children}
    </DirectorContext.Provider>
  );
}