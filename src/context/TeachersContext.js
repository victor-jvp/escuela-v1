import { createContext, useContext, useState } from "react";
import { createTeacherRequest, getTeachersRequest, activeTeacherRequest, inactiveTeacherRequest, deleteTeacherRequest } from '../api/teachers'
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

    const getTeachers = async () => {
        try {
            const res = await getTeachersRequest(user.token)
            setTeachers(res.data)
        } catch (error) {
            console.log(error)
        }
    }

    const createTeacher = async (teacher) => {
        try {
            await createTeacherRequest(user.token, teacher)
        } catch (error) {
            console.log(error)
        }
    }

    const deleteTeacher = async (id) => {
        try {
            const res = await deleteTeacherRequest(user.token, id)
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
                deleteTeacher
            }}>
            {children}
        </TeacherContext.Provider>
    )
}