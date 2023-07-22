import "./login.scss"
import { useForm } from 'react-hook-form';
import { useAuth } from '../../context/AuthProvider';
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {

  const {
    register,
    handleSubmit,
    formState: {
      errors
    } } = useForm()

  const { signin, errors: signinErrors, isAuthenticated } = useAuth();
  const navigate = useNavigate()

  const onSubmit = handleSubmit(data => {
    signin(data);
  })

  useEffect(() => {
    if (isAuthenticated) navigate("/")
  }, [isAuthenticated])

  return (
    <div className="login">
      <form
        onSubmit={onSubmit}>

        <h1>Iniciar Sesión</h1>
        {
          signinErrors?.map((error, i) => (
            <div className="div-error" key={i}>
              {error}
            </div>
          ))
        }
        <input type="email" placeholder='Email' {...register("email", { required: true })} />
        {
          errors.email && (
            <span className='text-error'>Email is required</span>
          )
        }
        <br />
        <input type="password" placeholder='Contraseña' {...register("password", { required: true })} />
        {
          errors.password && (
            <span className='text-error'>Password is required</span>
          )
        }
        <button>Ingresar</button>
      </form>
    </div>
  )
}

export default Login