import "./create-student.scss"
import Sidebar from '../../components/sidebar/Sidebar';
import Navbar from '../../components/navbar/Navbar';
import { useForm } from 'react-hook-form'
import { Link, useNavigate, useParams } from "react-router-dom";
import { useStudents } from '../../context/StudentsContext';
import Swal from 'sweetalert2';

const CreateStudent = () => {

  const { register, handleSubmit } = useForm()
  const { createStudent } = useStudents()
  const navigate = useNavigate()
  const params = useParams()

  const onSubmit = handleSubmit(async (data) => {
    const id = params.id
    const res = await createStudent(params.id, data)
    if (res === true) {
      navigate('/representants')
    } else {
      Swal.fire("Error!", res, 'error')
    }
  })

  return (
    <div className='new'>
      <Sidebar />
      <div className="newContainer">
        <Navbar />
        <div className="top">
          <h1>Agregar Estudiante Nuevo</h1>
          <Link to="/representants" className="link">
            Regresar
          </Link>
        </div>
        <div className="bottom">
          <div className="right">
            <form onSubmit={onSubmit}>
              <div className="formInput">
                <label htmlFor="nombres">Nombres</label>
                <input type="text" required {...register('nombres')} placeholder="..." autoFocus />
              </div>
              <div className="formInput">
                <label htmlFor="apellidos">Apellidos</label>
                <input type="text" required {...register('apellidos')} placeholder="..." />
              </div>
              <div className="formInput">
                <label htmlFor="fecha_de_nacimiento">Fecha de Nacimiento</label>
                <input type="date" required {...register('fecha_de_nacimiento')} placeholder="..." />
              </div>
              <div className="formInput">
                <label htmlFor="edad">Edad</label>
                <input type="text" required {...register('edad')} placeholder="..." />
              </div>
              <div className="formInput">
                <label htmlFor="grado">Grado</label>
                <input type="text" required {...register('grado')} placeholder="..." />
              </div>
              <div className="formInput">
                <label htmlFor="seccion">Sección</label>
                <input type="text" required {...register('seccion')} placeholder="..." />
              </div>
              <div className="formInput">
                <label htmlFor="direccion">Dirección</label>
                <input type="text" required {...register('direccion')} placeholder="..." />
              </div>
              <div className="formInput">
                <label htmlFor="docente">Docente</label>
                <input type="text" required {...register('docente')} placeholder="..." />
              </div>
              <div className="formInput">
                <label htmlFor="cedula_escolar">Cédula Escolar</label>
                <input type="text" required {...register('cedula_escolar')} placeholder="..." />
              </div>
              <div className="formInput">
                <label htmlFor="año_escolar">Año Escolar</label>
                <input type="text" required {...register('año_escolar')} placeholder="..." />
              </div>
              <div className="formInput">
                <button>Guardar</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CreateStudent