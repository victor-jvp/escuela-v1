import "./register.scss"
import { useForm } from 'react-hook-form';
import { useAuth } from '../../context/AuthProvider';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Register = () => {

  const { register, handleSubmit, formState: {
    errors
  } } = useForm()
  const { signup, isAuthenticated } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (isAuthenticated) navigate('/');
  }, [isAuthenticated])


  const onSubmit = handleSubmit(async (values) => {
    const res = await signup(values);
    if (res === true) {
      navigate("/login");
    }
  })

  return (
    <div className='register'>
      <form
        onSubmit={onSubmit}>
        <h1>Registrar Director</h1>
        <input type="text" placeholder='Usuario' {...register("username", { required: true })} />
        {
          errors.username && (
            <p className='text-error'>Username is required</p>
          )
        }
        <input type="email" placeholder='Email' {...register("email", { required: true })} />
        {
          errors.email && (
            <p className='text-error'>Email is required</p>
          )
        }
        <input type="password" placeholder='Contraseña' {...register("password", { required: true })} />
        {
          errors.password && (
            <p className='text-error'>Password is required</p>
          )
        }
        <button>Registrar</button>
      </form>
    </div>
  )
}

export default Register