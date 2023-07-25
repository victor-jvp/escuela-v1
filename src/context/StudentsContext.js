import { createContext, useContext, useState } from "react";
import {
  assignSectionRequest,
  createStudentRequest,
  getStudentsByRepresentantRequest,
  getStudentsRequest,
  removeSectionRequest,
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
      setStudents(res.data.map((e, i) => (
        {
          ...e,
          "_id": i
        }
      )))
      // setStudents(res.data)
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

  const createStudent = async (id, student) => {
    try {
      const res = await createStudentRequest(user.token, id, student);
      if (res.status === HttpStatusCode.Ok) {
        return true;
      } else {
        return res.data.message
      }
    } catch (error) {
      console.log(error)
    }
  }

  //Asignar sección
  const assignSection = async (id, data) => {
    try {
      const res = await assignSectionRequest(user.token, id, {
        section: data
      })
      if (res.status === 200) getStudents()
    } catch (error) {
      console.log(error)
    }
  }

  //Retirar sección
  const removeSection = async (id) => {
    try {
      const res = await removeSectionRequest(user.token, id)
      if (res.status === 200) getStudents()
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <StudentContext.Provider
      value={{
        students,
        getStudents,
        getStudentsByRepresentant,
        createStudent,
        assignSection,
        removeSection
      }}>
      {children}
    </StudentContext.Provider>
  )
}