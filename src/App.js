import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import Home from './pages/home/Home'
import Users from './pages/users/Users'
import CreateUser from "./pages/users/CreateUser";
import Students from './pages/studens/Students'
import Personal from './pages/personal/Personal'
import Teachers from './pages/teachers/Teachers'
import CreatePersonal from './pages/personal/CreatePersonal'
import CreateTeacher from './pages/teachers/CreateTeacher'
import CreateStudent from './pages/studens/CreateStudent'

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/">
            <Route index element={<Home />} />
            <Route path="/personal">
              <Route index element={<Personal />} />
              <Route path="create" element={<CreatePersonal />} />
            </Route>
            <Route path="/students">
              <Route index element={<Students />} />
              <Route path="create" element={<CreateStudent />} />
            </Route>
            <Route>
              <Route index element={<Teachers />} />
              <Route path="create" element={<CreateTeacher />} />
            </Route>
            <Route path="/users">
              <Route index element={<Users />} />
              <Route path="create" element={<CreateUser />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
