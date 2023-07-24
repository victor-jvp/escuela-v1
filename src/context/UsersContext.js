import { createContext, useContext, useState } from "react";
import { createUserRequest, getUsersRequest, activeUserRequest, inactiveUserRequest, deleteUserRequest } from '../api/users'
import { useAuth } from "./AuthProvider";

const UserContext = createContext();

export const useUsers = () => {
    const context = useContext(UserContext)

    if (!context) {
        throw new Error("useUsers must be used within a UserProvider")
    }
    return context;
}

export function UserProvider({ children }) {

    const [users, setUsers] = useState([]);
    const { user } = useAuth()

    const activateUser = async (id) => {
        try {
            const res = await activeUserRequest(user.token, id)
            if (res.status === 200) getUsers()
        } catch (error) {
            console.log(error)
        }
    }
    const deactivateUser = async (id) => {
        try {
            const res = await inactiveUserRequest(user.token, id)
            if (res.status === 200) getUsers()
        } catch (error) {
            console.log(error)
        }
    }

    const getUsers = async () => {
        try {
            const res = await getUsersRequest(user.token)
            setUsers(res.data)
        } catch (error) {
            console.log(error)
        }
    }

    const createUser = async (data) => {
        try {
            await createUserRequest(user.token, data)
        } catch (error) {
            console.log(error)
        }
    }

    const deleteUser = async (id) => {
        try {
            const res = await deleteUserRequest(user.token, id)
            if (res.status === 200) getUsers()
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <UserContext.Provider
            value={{
                users,
                createUser,
                getUsers,
                activateUser,
                deactivateUser,
                deleteUser
            }}>
            {children}
        </UserContext.Provider>
    )
}