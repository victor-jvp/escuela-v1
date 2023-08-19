import { createContext, useContext, useState } from "react";
import { createRepresentantRequest, deleteRepresentantRequest, getRepresentantRequest, getRepresentantsRequest } from "../api/representants";
import { useAuth } from "./AuthProvider";

const RepresentantContext = createContext();

export const useRepresentants = () => {
  const context = useContext(RepresentantContext)

  if (!context) {
    throw new Error("useRepresentants must be used within a RepresentantProvider")
  }
  return context;
}

export function RepresentantProvider({ children }) {

  const [representants, setRepresentants] = useState([])
  const { user } = useAuth()

  const getRepresentants = async () => {
    try {
      const res = await getRepresentantsRequest(user.token)
      setRepresentants(res.data)
    } catch (error) {
      console.log(error)
    }
  }

  const createRepresentant = async (data) => {
    try {
      const res = await createRepresentantRequest(user.token, data)
      if (res.status === 201) {
        return true
      } else {
        return res.data.message
      }
    } catch (error) {
      console.log(error)
      if (error.response.data.code === 11000) {
        return "El email ya se encuentra registrado";
      }
      return error.response.data.message
    }
  }

  const deleteRepresentant = async (id) => {
    try {
      const res = await deleteRepresentantRequest(user.token, id)
      if (res.status === 200) getRepresentants()
    } catch (error) {
      console.log(error)
    }
  }

  const getRepresentant = async (id) => {
    try {
      const res = await getRepresentantRequest(user.token, id)
      console.log(res);
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <RepresentantContext.Provider
      value={{
        representants,
        getRepresentant,
        getRepresentants,
        deleteRepresentant,
        createRepresentant
      }}>
      {children}
    </RepresentantContext.Provider>
  )
}