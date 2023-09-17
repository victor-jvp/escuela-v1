import axios from './axios';

const config = (token) => (
    {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    }
)

// Agregar nuevo periodo
export const createPeriodRequest = (token, data) => axios.post(
    `direccion/nuevoPeriodo`, data, config(token));

// Agregar Lapso a periodo actual
export const createLapseRequest = (token, data) => axios.post(
    `direccion/periodoActual/nuevoLapso`, data, config(token));

// Agregar Grados a lapto actual
export const addGradeRequest = (token, lapse, grade) => axios.post(
    `direccion/periodoActual/lapsos/${lapse}/crearGrados`, {
        grados: grade
    }, config(token));

// Agregar Secciones al grado del periodo actual
export const addSectionsRequest = (token, lapse, grade, section) => axios.post(
    `direccion/periodoActual/lapsos/${lapse}/grados/${grade}/crearSecciones`, {
        secciones: section
    }, config(token));

// Agregar estudiantes a una seccion del period y lapso actual + id grado + id seccion
export const addStudentsRequest = (token, id_grade, id_section, data) => axios.post(
    `direccion/periodoActual/lapsoActual/grados/${id_grade}/secciones/${id_section}/registrarEstudiantes`, data, config(token));