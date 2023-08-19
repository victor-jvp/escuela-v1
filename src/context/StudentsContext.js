import { createContext, useContext, useState } from "react";
import {
  assignSectionRequest,
  createStudentRequest,
  editStudentRequest,
  getStudentsByRepresentantRequest,
  getStudentsByTeacherRequest,
  getStudentsRequest,
  removeSectionRequest,
  setFinalQualifierStudentRequest,
  setInformStudentRequest,
  setPersonalRisksStudentRequest,
} from "../api/students";
import { useAuth } from "./AuthProvider";
import { HttpStatusCode } from "axios";

const StudentContext = createContext();

export const useStudents = () => {
  const context = useContext(StudentContext);

  if (!context) {
    throw new Error("useStudents must be used within a StudentProvider");
  }
  return context;
};

export function StudentProvider({ children }) {
  const [students, setStudents] = useState([]);
  const { user } = useAuth();

  const getStudents = async () => {
    try {
      const res = await getStudentsRequest(user.token);
      setStudents(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getStudent = async (id) => {
    try {
      const res = await getStudentsRequest(user.token);
      return res.data.filter((e) => e._id === id)[0];
    } catch (error) {
      console.log(error);
    }
  };

  const getStudentsByRepresentant = async (id) => {
    try {
      const res = await getStudentsByRepresentantRequest(user.token, id);
      setStudents(res.data !== "" ? res.data : []);
    } catch (error) {
      console.log(error);
    }
  };

  const createStudent = async (id, student) => {
    try {
      const res = await createStudentRequest(user.token, id, student);
      if (res.status === HttpStatusCode.Ok) {
        return true;
      } else {
        return res.data.message;
      }
    } catch (error) {
      console.log(error);
    }
  };

  const editStudent = async (id_rep, id_est, student) => {
    try {
      const res = await editStudentRequest(user.token, id_rep, id_est, student);
      if (res.status === HttpStatusCode.Ok) {
        return true;
      } else {
        return res.data.message;
      }
    } catch (error) {
      console.log(error);
    }
  };

  //Asignar sección
  const assignSection = async (id_rep, id_est, data) => {
    try {
      const res = await assignSectionRequest(user.token, id_rep, id_est, {
        seccion: data,
      });
      if (res.status === 200) getStudents();
    } catch (error) {
      console.log(error);
    }
  };

  //Retirar sección
  const removeSection = async (id_rep, id_est) => {
    try {
      const res = await removeSectionRequest(user.token, id_rep, id_est);
      if (res.status === 200) getStudents();
    } catch (error) {
      console.log(error);
    }
  };

  // Obtener estudiantes por profesor
  const getStudentsByTeacher = async () => {
    try {
      const res = await getStudentsByTeacherRequest(user.token);
      setStudents(res.data !== "" ? res.data : []);
    } catch (error) {
      console.log(error);
    }
  };

  // Cargar informe descriptivo a estudainte por profesor
  const informeDescriptivo = async (id, data) => {
    try {
      const res = await setInformStudentRequest(user.token, id, data);
      return res.status === HttpStatusCode.Created;
    } catch (error) {
      console.log(error);
    }
  };

  // Cargar rasgos personales a estudiante por profesor
  const rasgosPersonales = async (id, data) => {
    try {
      const res = await setPersonalRisksStudentRequest(user.token, id, data);
      return res.status === HttpStatusCode.Created;
    } catch (error) {
      console.log(error);
    }
  };

  // Cargar calificativo final a estudiante por profesor
  const calificativoFinal = async (id, data) => {
    try {
      const res = await setFinalQualifierStudentRequest(user.token, id, data);
      return res.status === HttpStatusCode.Created;
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <StudentContext.Provider
      value={{
        students,
        getStudent,
        getStudents,
        getStudentsByRepresentant,
        getStudentsByTeacher,
        createStudent,
        editStudent,
        informeDescriptivo,
        rasgosPersonales,
        assignSection,
        removeSection,
        calificativoFinal
      }}
    >
      {children}
    </StudentContext.Provider>
  );
}
