import { createContext, useContext, useState } from "react";
import { createUserRequest, getUsersRequest, activeUserRequest, inactiveUserRequest } from '../api/users'

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

    const activateUser = async (id) => {
        try {
            const res = await activeUserRequest(id)
        } catch (error) {
            console.log(error)
        }
    }
    const deactivateUser = async (id) => {
        try {
            const res = await inactiveUserRequest(id)
        } catch (error) {
            console.log(error)
        }
    }

    const getUsers = async () => {
        try {
            const res = await getUsersRequest()
            setUsers(res.data)
        } catch (error) {
            console.log(error)
        }
    }

    const createUser = async (user) => {
        try {
            await createUserRequest(user)
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
                deactivateUser
            }}>
            {children}
        </UserContext.Provider>
    )
}