import { createContext, useContext, useState } from "react";
import {
  createStudentRequest,
  getStudentsByRepresentantRequest,
  getStudentsRequest,
} from '../api/students'
import { useAuth } from './AuthProvider'
import { HttpStatusCode } from "axios";

const StudentContext = createContext();

export const useStudents = () => {
  const context = useContext(StudentContext)

  if (!context) {
    throw new Error("useStudents must be used within a StudentProvider")
  }
  return context;
}

export function StudentProvider({ children }) {

  const [students, setStudents] = useState([]);
  const { user } = useAuth()

  const getStudents = async () => {
    try {
      const res = await getStudentsRequest(user.token)
      setStudents(res.data)
    } catch (error) {
      console.log(error)
    }
  }

  const getStudentsByRepresentant = async (id) => {
    try {
      const res = await getStudentsByRepresentantRequest(user.token, id)
      setStudents(res.data !== "" ? res.data : [])
    } catch (error) {
      console.log(error)
    }
  }

  const createStudent = async (student) => {
    try {
      const res = await createStudentRequest(user.token, user.id, student);
      if (res.status === HttpStatusCode.Created) {
        return true;
      } else {
        return res.data.message
      }
    } catch (error) {
      console.log(error)
    }
  }

  // const deleteRepresentant = async (data) => {
  //     try {
  //         await deleteRepresentantRequest(user.token, data)
  //     } catch (error) {
  //         console.log(error)
  //     }
  // }

  return (
    <StudentContext.Provider
      value={{
        students,
        getStudents,
        getStudentsByRepresentant,
        createStudent,
      }}>
      {children}
    </StudentContext.Provider>
  )
}