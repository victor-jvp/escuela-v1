import "./create-student.scss"
import Sidebar from '../../components/sidebar/Sidebar';
import Navbar from '../../components/navbar/Navbar';
import { useForm } from 'react-hook-form'
import { Link } from "react-router-dom";

const CreateStudent = () => {

  const { register, handleSubmit } = useForm()

  const onSubmit = handleSubmit((data) => {
    console.log(data)
  })

  return (
    <div className='new'>
      <Sidebar />
      <div className="newContainer">
        <Navbar />
        <div className="top">
          <h1>Agregar Estudiante Nuevo</h1>
          <Link to="/students" className="link">
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
              <button>Guardar</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CreateStudent