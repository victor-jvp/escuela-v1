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
import CreateStudent from './pages/students/CreateStudent'
import "./style/dark.scss"
import { useContext } from "react";
import { DarkModeContext } from "./context/darkModeContext";
import EditStudent from "./pages/students/EditStudent";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import { AuthProvider } from "./context/AuthProvider";
import ProtectedRoute from "./pages/ProtectedRoute";
import Representant from "./pages/representant/Representant";
import CreateRepresentant from './pages/representant/CreateRepresentant'
import { UserProvider } from './context/UsersContext'
import { TeacherProvider } from "./context/TeachersContext";
import { StudentProvider } from "./context/StudentsContext";

function App() {

  const { darkMode } = useContext(DarkModeContext)

  return (
    <div className={darkMode ? 'app dark' : 'app'}>
      <AuthProvider>
        <UserProvider>
          <TeacherProvider>
            <StudentProvider>
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
                      <Route path="create" element={<CreateRepresentant />} />
                    </Route>
                    <Route path="students">
                      <Route index element={<Students />} />
                      <Route
                        path="create"
                        element={<CreateStudent />} />
                      <Route
                        path="edit/:id"
                        element={<EditStudent />} />
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
            </StudentProvider>
          </TeacherProvider>
        </UserProvider>
      </AuthProvider>
    </div>
  );
}

export default App;
