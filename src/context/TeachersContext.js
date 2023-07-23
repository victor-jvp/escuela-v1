import { createContext, useContext, useState } from "react";
import { createTeacherRequest, getTeachersRequest, activeTeacherRequest, inactiveTeacherRequest } from '../api/teachers'

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

    const activateTeacher = async (id) => {
        try {
            const res = await activeTeacherRequest(id)
            if (res.status === 200) {
                getTeachers()
            }
        } catch (error) {
            console.log(error)
        }
    }
    const deactivateTeacher = async (id) => {
        try {
            const res = await inactiveTeacherRequest(id)
            if (res.status === 200) {
                getTeachers()
            }
        } catch (error) {
            console.log(error)
        }
    }

    const getTeachers = async () => {
        try {
            const res = await getTeachersRequest()
            setTeachers(res.data)
        } catch (error) {
            console.log(error)
        }
    }

    const createTeacher = async (teacher) => {
        try {
            await createTeacherRequest(teacher)
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
                deactivateTeacher
            }}>
            {children}
        </TeacherContext.Provider>
    )
}