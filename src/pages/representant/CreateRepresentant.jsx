import { useStudents } from '../../context/StudentsContext';
import Sidebar from '../../components/sidebar/Sidebar'
import Navbar from '../../components/navbar/Navbar'
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';

const CreateRepresentant = () => {
  const { register, handleSubmit } = useForm();
  const { createRepresentant } = useStudents();
  const navigate = useNavigate()

  const onSubmit = handleSubmit((data) => {
    createRepresentant(data)
    navigate("/representants")
  })

  return (
    <div className='new'>
      <Sidebar />
      <div className="newContainer">
        <Navbar />
        <div className="top">
          <h1>Crear Nuevo Representante</h1>
          <Link to='/representants' className="link">
            Volver
          </Link>
        </div>
        <div className="bottom">
          <div className="right">
            <form onSubmit={onSubmit}>
              <div className="formInput">
                <label htmlFor="name">Nombre</label>
                <input type="text" {...register("name")} placeholder='...' autoFocus required />
              </div>
              <div className="formInput">
                <label htmlFor="email">Email</label>
                <input type="email" {...register("email")} placeholder="..." required />
              </div>
              <div className="formInput">
                <label htmlFor="password">Contraseña</label>
                <input type="password" {...register("password")} placeholder='...' required />
              </div>
              <button>Guardar</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CreateRepresentant