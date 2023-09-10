import "./home.scss"
import Sidebar from "../../components/sidebar/Sidebar"
import Navbar from '../../components/navbar/Navbar'
import Widget from "../../components/widget/Widget"
import { useTeachers } from "../../context/TeachersContext"
import { useEffect } from "react"
import {useStudents} from '../../context/StudentsContext'
import {useUsers} from '../../context/UsersContext'
import Swal from "sweetalert2"
import { useDirectors } from "../../context/DirectorContext"

const Home = () => {

  const { teachers, getTeachers } = useTeachers();
  const { students, getStudents } = useStudents();
  const { users, getUsers } = useUsers();
  const { addPeriod } = useDirectors();

  useEffect(() => {
    getTeachers();
    getStudents();
    getUsers();
  }, []);

  const _addPeriod = () => {
    Swal.fire({
      title: 'Ingrese el periodo escolar:',
      input: 'text',
      inputValue: '',
      inputAttributes: {
        autocapitalize: 'off'
      },
      showCancelButton: true,
      confirmButtonText: 'Actualizar',
      showLoaderOnConfirm: true,
      preConfirm: async (data) => {
        return await addPeriod(data)
      },
      allowOutsideClick: () => !Swal.isLoading()
    }).then((result) => {
      if (result === true) {
        // Swal.fire({
        //   title: `${result.value.login}'s avatar`,
        //   imageUrl: result.value.avatar_url
        // })
        Swal.close()
      }
    })
  }

  return (
    <div className="home">
      <Sidebar />
      <div className="homeContainer">
        <Navbar />
        <div className="widgets">
          <Widget type='user' amount={users.length ?? 0} />
          <Widget type='teacher' amount={teachers.length ?? 0} />
          <Widget type='student' amount={students.length ?? 0} />
        </div>
        <div className="listContainer">
          <div className="listTitle">Periodo Escolar Actual: </div>
          <div className="listTitle">Lapso Actual: </div>
          <button type="button"
            onClick={ _addPeriod }
            className="addButton"
              >Agregar Periodo Escolar</button>
        </div>
      </div>
    </div>
  )
}

export default Home