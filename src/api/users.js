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

export const activeUserRequest = (id) => axios.patch(
    `direccion/${id}/habilitarAdministrador`, { "id_administrador": id }, config);

export const inactiveUserRequest = (id) => axios.patch(
    `direccion/${id}/deshabilitarAdministrador`, { "id_administrador": id }, config);

// export const deleteUserRequest = (id) => axios.delete(
//     `direccion/administracion/${id}/eliminarAdministrador`, config);