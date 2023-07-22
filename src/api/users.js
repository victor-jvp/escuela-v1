import axios from './axios'

const session = JSON.parse(sessionStorage?.getItem('session'))

const config = {
    headers: {
        'Authorization': `Bearer ${session?.token}`
    }
}

export const getUsersRequest = () => axios.get(`administracion`, config);

export const createUserRequest = (user) => axios.post(
    `direccion/administracion/registrarAdministrador`, user, config);

export const activeUserRequest = (id) => axios.get(
    `direccion/${id}/habilitarAdministrador`, config);

export const inactiveUserRequest = (id) => axios.get(
    `direccion/${id}/inhabilitarAdministrador`, config);

export const deleteUserRequest = (id) => axios.delete(
    `direccion/administracion/${id}/eliminarAdministrador`, config);