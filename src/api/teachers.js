import axios from './axios'

const session = JSON.parse(sessionStorage?.getItem('session'))

const config = {
    headers: {
        'Authorization': `Bearer ${session?.token}`
    }
}

export const getTeachersRequest = () => axios.get(`docentes`, config);

export const createTeacherRequest = (teacher) => axios.post(
    `docente/registrarDocente`, teacher, config);

export const activeTeacherRequest = (id) => axios.patch(
    `docente/${id}/habilitarDocente`, {}, config);

export const inactiveTeacherRequest = (id) => axios.patch(
    `docente/${id}/deshabilitarDocente`, {}, config);

export const deleteTeacherRequest = (id) => axios.delete(
    `docente/${id}/eliminarDocente`, config);

export const assignSectionRequest = (id, data) => axios.patch(
    `docente/${id}/asignarSeccion`, data, config);

export const removeSectionRequest = (id) => axios.patch(
    `docente/${id}/retirarSeccion`, {}, config);