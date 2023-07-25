import { createContext, useContext, useState } from "react";
import { createTeacherRequest, getTeachersRequest, activeTeacherRequest, inactiveTeacherRequest, deleteTeacherRequest, removeSectionRequest, assignSectionRequest } from '../api/teachers'
import { useAuth } from './AuthProvider'

const TeacherContext = createContext();

export const useTeachers = () => {
    const context = useContext(TeacherContext)

    if (!context) {
        throw new Error("useTeachers must be used within a TeacherProvider")
    }
    return context;
}

export function TeacherProvider({ children }) {

    const [teachers, setTeachers] = useState([]);
    const { user } = useAuth()

    // Habilitar
    const activateTeacher = async (id) => {
        try {
            const res = await activeTeacherRequest(user.token, id)
            if (res.status === 200) {
                getTeachers()
            }
        } catch (error) {
            console.log(error)
        }
    }

    //Deshabilitar
    const deactivateTeacher = async (id) => {
        try {
            const res = await inactiveTeacherRequest(user.token, id)
            if (res.status === 200) {
                getTeachers()
            }
        } catch (error) {
            console.log(error)
        }
    }

    // Obtener lista
    const getTeachers = async () => {
        try {
            const res = await getTeachersRequest(user.token)
            setTeachers(res.data)
        } catch (error) {
            console.log(error)
        }
    }

    // Crear
    const createTeacher = async (teacher) => {
        try {
            const res = await createTeacherRequest(user.token, teacher)
            if (res.status === 201) {
                return true
            } else {
                return res.data.message
            }
        } catch (error) {
            // console.log(error)
            if (error.response.data.code === 11000) {
                return "El email ya se encuentra registrado";
            }
            return error.response.data.message
        }
    }

    // Eliminar
    const deleteTeacher = async (id) => {
        try {
            const res = await deleteTeacherRequest(user.token, id)
            if (res.status === 200) getTeachers()
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
            if (res.status === 200) getTeachers()
        } catch (error) {
            console.log(error)
        }
    }

    //Retirar sección
    const removeSection = async (id) => {
        try {
            const res = await removeSectionRequest(user.token, id)
            if (res.status === 200) getTeachers()
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <TeacherContext.Provider
            value={{
                teachers,
                createTeacher,
                getTeachers,
                activateTeacher,
                deactivateTeacher,
                deleteTeacher,
                assignSection,
                removeSection
            }}>
            {children}
        </TeacherContext.Provider>
    )
}