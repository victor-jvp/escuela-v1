import axios from './axios'

const config = (token) => (
    {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    }
)

export const getStudentsRequest = (token) => axios.get(`direccion/estudiantes`, config(token));

export const getStudentsByRepresentantRequest = (token, id) => axios.get(`representante/${id}`, config(token));

export const createStudentRequest = (token, id, user) => axios.post(`direccion/${id}/nuevoEstudiante`, config(token));

// export const deleteRepresentantRequest = (token, id) => axios.post(
//     `representante/nuevoRepresentante`, id, {
//     headers: {   
//         'Authorization': `Bearer ${token}`
//     }
// });

