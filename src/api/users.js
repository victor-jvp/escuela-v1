import axios from './axios'

export const getUsersRequest = (token) => axios.get(`administracion`, {
    headers: {
        'Authorization': `Bearer ${token}`
    }
});

export const createUserRequest = (token, user) => axios.post(
    `direccion/administracion/registrarAdministrador`, user, {
    headers: {
        'Authorization': `Bearer ${token}`
    }
});

export const activeUserRequest = (token, id) => axios.patch(
    `direccion/${id}/habilitarAdministrador`, { "id_administrador": id }, {
    headers: {
        'Authorization': `Bearer ${token}`
    }
});

export const inactiveUserRequest = (token, id) => axios.patch(
    `direccion/${id}/deshabilitarAdministrador`, { "id_administrador": id }, {
    headers: {
        'Authorization': `Bearer ${token}`
    }
});

// export const deleteUserRequest = (id) => axios.delete(
//     `direccion/administracion/${id}/eliminarAdministrador`, config);