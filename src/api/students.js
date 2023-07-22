import axios from './axios'

const session = JSON.parse(sessionStorage.getItem('session'))

const config = {
    headers: {
        'Authorization': `Bearer ${session.token}`
    }
}

export const getStudentsRequest = () => axios.get(`representante/${session.representante.id}/estudiantes`, config);
// export const getStudentRequest = (id) => axios.get(`representante/${id}/estudiantes`);
// export const getStudents = (id) => axios.get(`representante/${id}/estudiantes`);
// export const getStudents = (id) => axios.get(`representante/${id}/estudiantes`);