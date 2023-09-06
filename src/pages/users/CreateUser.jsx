import { useForm } from 'react-hook-form';
import './create-user.scss'
import Sidebar from '../../components/sidebar/Sidebar';
import Navbar from '../../components/navbar/Navbar';
import { useUsers } from '../../context/UsersContext';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const CreateUser = () => {
  const { register, handleSubmit } = useForm();
  const { createUser } = useUsers();
  const navigate = useNavigate()

  const onSubmit = handleSubmit(async (data) => {
    data.habilitado = true;
    const res = await createUser(data)
    if (res === true) {
      navigate("/users")
    } else {
      Swal.fire("Error en el proceso", res, "error");
    }
  })

  return (
    <div className='new'>
      <Sidebar />
      <div className="newContainer">
        <Navbar />
        <div className="top">
          <h1>Crear Nuevo Administrador</h1>
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

export default CreateUser