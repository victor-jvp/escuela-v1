import axios from './axios'

const TOKEN = JSON.parse(sessionStorage.getItem('session'))?.token
const config = {
    headers: {
        'Authorization': `Bearer ${TOKEN}`
    }
}

export const getPersonalRequest = () => axios.get(`administracion`, config);

export const createPersonalRequest = (data) => axios.post(`direccion/administracion/registrarAdministrador`, data, config);