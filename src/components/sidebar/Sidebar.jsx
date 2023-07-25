import "./sidebar.scss"
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People';
import SchoolIcon from '@mui/icons-material/School';
import FolderSharedIcon from '@mui/icons-material/FolderShared';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import { Link } from 'react-router-dom';
import { useContext } from "react";
import { DarkModeContext } from "../../context/darkModeContext";

const Sidebar = () => {

  const { dispatch } = useContext(DarkModeContext)

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

          <hr />

          <Link to="/" style={{ textDecoration: "none" }}>
            <li>
              <DashboardIcon className="icon" />
              <span>Home</span>
            </li>
          </Link>
          <Link to="/representants" style={{ textDecoration: "none" }}>
            <li>
              <PeopleIcon className="icon" />
              <span>Representantes</span>
            </li>
          </Link>
          <Link to="/students" style={{ textDecoration: "none" }}>
            <li>
              <SchoolIcon className="icon" />
              <span>Estudiantes</span>
            </li>
          </Link>

          <p className="title">CONFIGURACION</p>

          <hr />

          <Link to="/personal" style={{ textDecoration: "none" }}>
            <li>
              <FolderSharedIcon className="icon" />
              <span>Personal Administrativo</span>
            </li>
          </Link>
          <Link to="/teachers" style={{ textDecoration: "none" }}>
            <li>
              <AssignmentIndIcon className="icon" />
              <span>Profesores</span>
            </li>
          </Link>
          <Link to="/users" style={{ textDecoration: "none" }}>
            <li>
              <PeopleIcon className="icon" />
              <span>Usuarios</span>
            </li>
          </Link>
        </ul>
      </div>
      <div className="bottom">
        <div className="colorOption" onClick={() => dispatch({ type: "LIGHT" })}></div>
        <div className="colorOption" onClick={() => dispatch({ type: "DARK" })}></div>
      </div>
    </div>
  )
}

export default Sidebar