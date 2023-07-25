import Sidebar from '../../components/sidebar/Sidebar'
import Navbar from '../../components/navbar/Navbar'
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import { useRepresentants } from '../../context/RepresentantsContext';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { useAuth } from '../../context/AuthProvider';

const CreateRepresentant = ({ title }) => {
  const { register, handleSubmit } = useForm();
  const { createRepresentant, getRepresentant } = useRepresentants();
  const navigate = useNavigate()
  const params = useParams()

  useEffect(() => {
    if (params.id) {
      _getRepresentant(params.id)
    }
  }, [])

  const _getRepresentant = (id) => {
    getRepresentant(params.id)
  }

  const onSubmit = handleSubmit(async (data) => {
    const res = await createRepresentant(data)
    if (res === true) {
      navigate("/representants")
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
          <h1>{title}</h1>
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

export default CreateRepresentant