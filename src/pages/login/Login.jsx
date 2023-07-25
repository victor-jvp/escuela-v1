import "./login.scss"
import { useForm, Controller } from 'react-hook-form';
import { useAuth } from '../../context/AuthProvider';
import { useEffect } from "react";
import { isRouteErrorResponse, useNavigate } from "react-router-dom";
import Select from 'react-select';

const Login = () => {

  const {
    register,
    control,
    handleSubmit,
    formState: {
      errors
    } } = useForm()

  const { signin, errors: signinErrors, isAuthenticated } = useAuth();
  const navigate = useNavigate()

  const onSubmit = handleSubmit(form => {
    signin({
      email: form.email,
      password: form.password,
      type: form.type.value
    });
  })

  useEffect(() => {
    // console.log(isAuthenticated)
    if (isAuthenticated) navigate("/")
  }, [isAuthenticated])

  const usersTypeList = [
    { value: 'docente', label: 'Profesor' },
    { value: 'direccion', label: 'Director' },
    { value: 'administracion', label: 'Administrador' }
  ]

  return (
    <div className="login">
      <form
        onSubmit={onSubmit}>

        <h1>Iniciar Sesión</h1>
        {
          signinErrors?.map((error, i) => (
            <>
              <div className="div-error" key={i}>
                {error}
              </div>
            </>
          ))
        }
        <Controller
          name="type"
          title="Tipo de Usuario"
          control={control}
          rules={{ required: "Seleccione una opcion." }}

          render={({ field }) => (
            <Select
              options={usersTypeList}
              {...field}
              placeholder={'Tipo de Usuario'} />
          )}
        />
        {
          errors.type && (
            <span className='text-error'>Tipo de Usuario es requerido.</span>
          )
        }
        <input type="email" placeholder='Email' {...register("email", { required: true })} />
        {
          errors.email && (
            <span className='text-error'>Email es requerido.</span>
          )
        }
        <br />
        <input type="password" placeholder='Contraseña' {...register("password", { required: true })} />
        {
          errors.password && (
            <span className='text-error'>Contraseña es requerido.</span>
          )
        }
        <button>Ingresar</button>
      </form>
    </div>
  )
}

export default Login