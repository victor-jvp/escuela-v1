import {
  BrowserRouter,
  Routes,
  Route,
  useParams
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
import { useContext, useEffect } from "react";
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
import Evaluate from "./pages/students/Evaluate";
import Boletin from "./pages/students/Boletin";
import { PDFViewer } from '@react-pdf/renderer';
import Informe from "./pages/students/Informe";
import Constancia from "./pages/students/Constancia";
import { DirectorsProvider } from "./context/DirectorContext";

function App() {

  const { darkMode } = useContext(DarkModeContext)

  return (
    <div className={darkMode ? 'app dark' : 'app'}>
      <AuthProvider>
        <UserProvider>
          <DirectorsProvider>
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
                          <Route path=":id_rep/add-student" element={<StudentForm />} />
                        </Route>
                        <Route path="students">
                          <Route index element={<Students />} />
                          <Route path="evaluate" element={<Evaluate />} />
                          <Route
                            path=":id/boletin"
                            element={
                              <PDFViewer style={{ width: '99%', height: '98vh' }}>
                                <Boletin />
                              </PDFViewer>}
                          />
                          <Route
                            path=":id/informe"
                            element={
                              <PDFViewer style={{ width: '99%', height: '98vh' }}>
                                <Informe />
                              </PDFViewer>}
                          />
                          <Route
                            path=":id/constancia"
                            element={
                              <PDFViewer style={{ width: '99%', height: '98vh' }}>
                                <Constancia />
                              </PDFViewer>}
                          />
                          <Route
                            path="create"
                            element={<StudentForm />} />
                          <Route
                            path=":id_est/representants/:id_rep"
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
          </DirectorsProvider>
        </UserProvider>
      </AuthProvider>
    </div>
  );
}

export default App;
