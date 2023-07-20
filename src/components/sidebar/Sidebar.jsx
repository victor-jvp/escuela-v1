import "./sidebar.scss"
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People';
import SchoolIcon from '@mui/icons-material/School';
import FolderSharedIcon from '@mui/icons-material/FolderShared';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="top">
        <Link to="/" style={{ textDecoration: "none" }}>
          <span className="logo">logoescuela</span>
        </Link>
      </div>
      <hr />
      <div className="center">
        <ul>
          <p className="title">PRINCIPAL</p>
          <Link to="/" style={{ textDecoration: "none" }}>
            <li>
              <DashboardIcon className="icon" />
              <span>Home</span>
            </li>
          </Link>
          <Link to="/personal" style={{ textDecoration: "none" }}>
            <li>
              <FolderSharedIcon className="icon" />
              <span>Personal Administrativo</span>
            </li>
          </Link>
          <Link to="/docentes" style={{ textDecoration: "none" }}>
            <li>
              <AssignmentIndIcon className="icon" />
              <span>Profesores</span>
            </li>
          </Link>
          <Link to="/representante" style={{ textDecoration: "none" }}>
            <li>
              <SchoolIcon className="icon" />
              <span>Estudiantes</span>
            </li>
          </Link>
          <p className="title">CONFIGURACION</p>
          <Link to="/direccion" style={{ textDecoration: "none" }}>
            <li>
              <PeopleIcon className="icon" />
              <span>Usuarios</span>
            </li>
          </Link>
        </ul>
      </div>
      <div className="bottom">
        <div className="colorOption"></div>
        <div className="colorOption"></div>
      </div>
    </div>
  )
}

export default Sidebar