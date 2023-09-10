import { createContext, useContext,useState } from "react";
import { useAuth } from "./AuthProvider";
import { createPeriodRequest } from "../api/director";

const DirectorContext = createContext();

export const useDirectors = () => {
    const context = useContext(DirectorContext);

    if (!context) {
        throw new Error("useDirectors must be used within a DirectorProvider");
    }
    return context;
}

export function DirectorsProvider({ children })
{
    const [directors] = useState([]);
    const { user } = useAuth()
    
    const addPeriod = async (data) => {
        try {
          await createPeriodRequest(user.token, data);
        } catch (error) {
          console.log(error);
        }
      };

    return (
        <DirectorContext.Provider value={{
            directors,
            addPeriod
        }}>
            {children}
        </DirectorContext.Provider>
    );
}