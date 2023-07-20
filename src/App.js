import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import Home from './pages/home/Home'
import Users from './pages/users/Users'
import CreateUser from "./pages/users/CreateUser";
import EditUser from './pages/users/EditUser'
import Students from './pages/studens/Students'
import Personal from './pages/personal/Personal'
import Teachers from './pages/teachers/Teachers'
import CreatePersonal from './pages/personal/CreatePersonal'
import CreateTeacher from './pages/teachers/CreateTeacher'
import CreateStudent from './pages/studens/CreateStudent'
import { teacherInputs } from "./formTeacherSource";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/">
            <Route index element={<Home />} />
            <Route path="direccion">
              <Route index element={<Personal />} />
              <Route path="create" element={<CreatePersonal />} />
            </Route>
            <Route path="representante">
              <Route index element={<Students />} />
              <Route path="create" element={<CreateStudent />} />
            </Route>
            <Route path="docentes">
              <Route index element={<Teachers />} />
              <Route path="create" element={<CreateTeacher inputs={teacherInputs} title="Agregar Nuevo Docente" />} />
            </Route>
            <Route path="direccion">
              <Route index element={<Users />} />
              <Route path="create" element={<CreateUser />} />
              <Route path="edit/:iduser" element={<EditUser />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
