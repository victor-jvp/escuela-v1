import axios from './axios';

export const registerRequest = user => axios.post("/direccion/nuevoDirector", user)

export const loginRequest = user => axios.post("direccion/iniciarSesion", user)

export const logoutRequest = (user) => axios.post("direccion/cerrarSesion", user, {
    headers: {
        'Authorization': `Bearer ${user.token}`
    }
})