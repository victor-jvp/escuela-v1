import axios from './axios'

export const getStudentsRequest = (token) => axios.get(
    `direccion/estudiantes`, {
    headers: {
        'Authorization': `Bearer ${token}`
    }
});

export const getRepresentantsRequest = (token, id) => axios.get(
    `representante/${id}`, {
    headers: {
        'Authorization': `Bearer ${token}`
    }
});

export const createRepresentantRequest = (token, data) => axios.post(
    `representante/nuevoRepresentante`, data, {
    headers: {
        'Authorization': `Bearer ${token}`
    }
});

// export const deleteRepresentantRequest = (token, id) => axios.post(
//     `representante/nuevoRepresentante`, id, {
//     headers: {   
//         'Authorization': `Bearer ${token}`
//     }
// });

