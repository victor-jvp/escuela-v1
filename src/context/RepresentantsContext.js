import { createContext, useContext, useState } from "react";
import { getRepresentantsRequest } from "../api/representants";
import { useAuth } from "./AuthProvider";

const RepresentantContext = createContext();

export const useRepresentants = () => {
  const context = useContext(RepresentantContext)

  if (!context) {
    throw new Error("useRepresentants must be used within a RepresentantProvider")
  }
}

export function RepresentantProvider({ children }) {

  const [representants, setRepresentants] = useState([])
  const { user } = useAuth()

  const getRepresentants = async () => {
    try {
      const res = await getRepresentantsRequest(user.token, user._id)
      setRepresentants(res.data)
    } catch (error) {
      console.log(error)
    }
  }

  // const createRepresentant = async (data) => {
  //   try {
  //     await createRepresentantRequest(user.token, data)
  //   } catch (error) {
  //     console.log(error)
  //   }
  // }

  return (
    <RepresentantContext.Provider
      value={{
        representants,
        getRepresentants
      }}>
      {children}
    </RepresentantContext.Provider>
  )
}