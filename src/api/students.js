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

export const createStudentRequest = (token, id, student) => axios.patch(`representante/${id}/nuevoEstudiante`, student, config(token));

export const editStudentRequest = (token, id_rep, id_est, data) => axios.patch(`representante/${id_rep}/estudiante/${id_est}/editarEstudiante`, data, config(token));

export const assignSectionRequest = (token, id_rep, id_est, data) => axios.patch(`representante/${id_rep}/estudiante/${id_est}/moverSeccion`, data, config(token));

export const removeSectionRequest = (token, id_rep, id_est, data) => axios.patch(`representante/${id_rep}/estudiante/${id_est}/retirarSeccion`, {}, config(token));