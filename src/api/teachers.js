import axios from './axios'

export const getTeachersRequest = (token) => axios.get(`docentes`, {
    headers: {
        'Authorization': `Bearer ${token}`
    }
});

export const createTeacherRequest = (token, teacher) => axios.post(
    `docente/registrarDocente`, teacher, {
    headers: {
        'Authorization': `Bearer ${token}`
    }
});

export const activeTeacherRequest = (token, id) => axios.patch(
    `docente/${id}/habilitarDocente`, {}, {
    headers: {
        'Authorization': `Bearer ${token}`
    }
});

export const inactiveTeacherRequest = (token, id) => axios.patch(
    `docente/${id}/deshabilitarDocente`, {}, {
    headers: {
        'Authorization': `Bearer ${token}`
    }
});

export const deleteTeacherRequest = (token, id) => axios.delete(
    `docente/${id}/eliminarDocente`, {
    headers: {
        'Authorization': `Bearer ${token}`
    }
});

export const assignSectionRequest = (token, id, data) => axios.patch(
    `docente/${id}/asignarSeccion`, data, {
    headers: {
        'Authorization': `Bearer ${token}`
    }
});

export const removeSectionRequest = (token, id) => axios.patch(
    `docente/${id}/retirarSeccion`, {}, {
    headers: {
        'Authorization': `Bearer ${token}`
    }
});