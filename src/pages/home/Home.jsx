import "./home.scss"
import Sidebar from "../../components/sidebar/Sidebar"
import Navbar from '../../components/navbar/Navbar'
import Widget from "../../components/widget/Widget"
import { useTeachers } from "../../context/TeachersContext"
import { useEffect } from "react"
import {useStudents} from '../../context/StudentsContext'
import {useUsers} from '../../context/UsersContext'

const Home = () => {

  const { teachers, getTeachers } = useTeachers();
  const { students, getStudents } = useStudents();
  const { users, getUsers } = useUsers();

  useEffect(() => {
    getTeachers();
    getStudents();
    getUsers();
  }, []);

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
          <div className="listTitle">Alguna lista o tabla puede ir aqui</div>

        </div>
      </div>
    </div>
  )
}

export default Home