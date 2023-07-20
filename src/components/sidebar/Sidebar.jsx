import "./sidebar.scss"
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People';
import SchoolIcon from '@mui/icons-material/School';
import FolderSharedIcon from '@mui/icons-material/FolderShared';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';

const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="top">
        <span className="logo">logoescuela</span>
      </div>
      <hr />
      <div className="center">
        <ul>
          <p className="title">PRINCIPAL</p>
          <li>
            <DashboardIcon className="icon" />
            <span>Home</span>
          </li>
          <li>
            <FolderSharedIcon className="icon" />
            <span>Personal Administrativo</span>
          </li>
          <li>
            <AssignmentIndIcon className="icon" />
            <span>Profesores</span>
          </li>
          <li>
            <SchoolIcon className="icon" />
            <span>Estudiantes</span>
          </li>
          <p className="title">CONFIGURACION</p>
          <li>
            <PeopleIcon className="icon" />
            <span>Usuarios</span>
          </li>
        </ul>
      </div>
      <div className="bottom">
        <div className="colorOption"></div>
        <div className="colorOption"></div>
        <div className="colorOption"></div>
      </div>
    </div>
  )
}

export default Sidebar