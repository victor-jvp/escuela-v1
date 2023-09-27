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

// Obtener boletin del estudiante
export const getStudentNotesRequest = (token, id) => axios.get(`estudiante/${id}/boletin`, config(token));

// Obtener informe Descriptivo del estudiante
export const getStudentDescriptiveReportRequest = (token, id) => axios.get(`estudiante/${id}/informeDescriptivo`, config(token));

// Docente

//Cargar estudiantes del profesor
export const getStudentsByTeacherRequest = (token) => axios.get(`profesor/estudiantes`, config(token));

// Cargar informe descriptivo: patch /estudiante/:estudiante/cargarInforme 
export const setInformStudentRequest = (token, id, data) => axios.post(
  `docentes/estudiantes/${id}/informeDescriptivo/cargarInforme`,
  data,
  config(token))

// Establecer rasgos personales: patch /estudiante/:estudiante/cargarRasgosPersonales
export const setStudentPersonalTraitsRequest = (token, id, data) => axios.patch(
  `estudiante/cargarRasgosPersonales`,
  data,
  config(token))

// Registrar calificativo final: patch /estudiante/:estudiante/registrarCalificativoFinal
export const setFinalQualifierStudentRequest = (token, id_student, data) => axios.patch(
  `docentes/estudiantes/${id_student}/calificativoFinal/registrarLiteralCalificativoFinal`,
  data,
  config(token))

// (Registrar nombre del proyecto escolar: patch /estudiante/:estudiante/registrarCalificativoFinal)
// export const setStudentRequest = (token, data) => axios.patch(`proyectoEscolar/registrarProyecto`, data, config(token))