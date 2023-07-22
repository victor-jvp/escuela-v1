import { createContext, useContext, useState } from "react";
import { createUserRequest, getUsersRequest } from '../api/users'

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

    const getUsers = async () => {
        try {
            const res = await getUsersRequest()
            setUsers(res.data)
        } catch (error) {
            console.log(error)
        }
    }

    const createUser = async (user) => {
        const res = await createUserRequest(user)
        console.log(res)
    }

    return (
        <UserContext.Provider
            value={{
                users,
                createUser,
                getUsers,
            }}>
            {children}
        </UserContext.Provider>
    )
}