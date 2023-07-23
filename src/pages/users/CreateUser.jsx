import { useForm } from 'react-hook-form';
import './create-user.scss'
import Sidebar from '../../components/sidebar/Sidebar';
import Navbar from '../../components/navbar/Navbar';
import { useUsers } from '../../context/UsersContext';
import { Link, useNavigate } from 'react-router-dom';

const CreateUser = () => {
  const { register, handleSubmit } = useForm();
  const { createUser } = useUsers();
  const navigate = useNavigate()

  const onSubmit = handleSubmit((data) => {
    data.habilitado = true;
    createUser(data)
    navigate("/users")
  })

  return (
    <div className='new'>
      <Sidebar />
      <div className="newContainer">
        <Navbar />
        <div className="top">
          <h1>Crear Nuevo Usuario</h1>
          <Link to='/users' className="link">
            Volver
          </Link>
        </div>
        <div className="bottom">
          <div className="right">
            <form onSubmit={onSubmit}>
              <div className="formInput">
                <label htmlFor="name">Usuario</label>
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

export default CreateUser