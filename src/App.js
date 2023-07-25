import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import Home from './pages/home/Home'
import Users from './pages/users/Users'
import CreateUser from "./pages/users/CreateUser";
import EditUser from './pages/users/EditUser'
import Students from './pages/students/Students'
import Personal from './pages/personal/Personal'
import Teachers from './pages/teachers/Teachers'
import CreatePersonal from './pages/personal/CreatePersonal'
import CreateTeacher from './pages/teachers/CreateTeacher'
import StudentForm from './pages/students/StudentForm'
import "./style/dark.scss"
import { useContext } from "react";
import { DarkModeContext } from "./context/darkModeContext";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import { AuthProvider } from "./context/AuthProvider";
import ProtectedRoute from "./pages/ProtectedRoute";
import Representant from "./pages/representant/Representants";
import RepresentantsForm from './pages/representant/RepresentantsForm'
import { UserProvider } from './context/UsersContext'
import { TeacherProvider } from "./context/TeachersContext";
import { StudentProvider } from "./context/StudentsContext";
import { RepresentantProvider } from "./context/RepresentantsContext";
import ShowRepresentant from "./pages/representant/ShowRepresentant";

function App() {

  const { darkMode } = useContext(DarkModeContext)

  return (
    <div className={darkMode ? 'app dark' : 'app'}>
      <AuthProvider>
        <UserProvider>
          <TeacherProvider>
            <StudentProvider>
              <RepresentantProvider>
                <BrowserRouter>
                  <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/" element={<ProtectedRoute />}>
                      <Route index element={<Home />} />
                      <Route path="personal">
                        <Route index element={<Personal />} />
                        <Route path="create" element={<CreatePersonal />} />
                      </Route>
                      <Route path="representants">
                        <Route index element={<Representant />} />
                        <Route path="create" element={<RepresentantsForm title="Nuevo Representante" />} />
                        <Route path="edit/:id" element={<RepresentantsForm title="Modificar Representante" />} />
                        <Route path=":id" element={<ShowRepresentant />} />
                        <Route path=":id/create" element={<StudentForm />} />
                      </Route>
                      <Route path="students">
                        <Route index element={<Students />} />
                        <Route
                          path="create"
                          element={<StudentForm />} />
                        <Route
                          path="edit/:id"
                          element={<StudentForm />} />
                      </Route>
                      <Route path="teachers">
                        <Route index element={<Teachers />} />
                        <Route
                          path="create"
                          element={<CreateTeacher />} />
                      </Route>
                      <Route path="users">
                        <Route index element={<Users />} />
                        <Route path="create" element={<CreateUser />} />
                        <Route path="edit/:iduser" element={<EditUser />} />
                      </Route>
                    </Route>
                  </Routes>
                </BrowserRouter>
              </RepresentantProvider>
            </StudentProvider>
          </TeacherProvider>
        </UserProvider>
      </AuthProvider>
    </div>
  );
}

export default App;
