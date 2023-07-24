import axios from './axios'

export const getPersonalRequest = (token) => axios.get(`administracion`, {
    headers: {
        'Authorization': `Bearer ${token}`
    }
});

export const createPersonalRequest = (token, data) => axios.post(
    `direccion/administracion/registrarAdministrador`, data, {
    headers: {
        'Authorization': `Bearer ${token}`
    }
});