import "./widget.scss"
import KeyboardArrowUpOutlinedIcon from '@mui/icons-material/KeyboardArrowUpOutlined';
import PeopleIcon from '@mui/icons-material/People';
import SchoolIcon from '@mui/icons-material/School';
import FolderSharedIcon from '@mui/icons-material/FolderShared';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';

const Widget = ({ type }) => {

  let data;

  switch (type) {
    case "user":
      data = {
        title: "USUARIOS",
        amount: 1,
        link: 'Ver usuarios',
        icon: (
          <PeopleIcon className="icon" style={{ backgroundColor: "rgba(255, 50, 255, 0.2)", color: "#6439ff" }} />
        )
      }
      break;
    case "teacher":
      data = {
        title: "PROFESORES",
        amount: 10,
        link: 'Ver profesores',
        icon: (
          <AssignmentIndIcon className="icon" style={{ backgroundColor: "rgba(255, 50, 255, 0.2)", color: "#6439ff" }} />
        )
      }
      break;
    case "student":
      data = {
        title: "ESTUDIANTES",
        amount: 30,
        link: 'Ver estudiantes',
        icon: (
          <SchoolIcon className="icon" style={{ backgroundColor: "rgba(255, 50, 255, 0.2)", color: "#6439ff" }} />
        )
      }
      break;
    case "adm_personal":
      data = {
        title: "PERSONAL ADMINISTRATIVO",
        amount: 40,
        link: 'Ver personal administrativo',
        icon: (
          <FolderSharedIcon className="icon" style={{ backgroundColor: "rgba(255, 50, 255, 0.2)", color: "#6439ff" }} />
        )
      }
      break;
    default:
      break;
  }

  return (
    <div className="widget">
      <div className="left">
        <span className="title">{data.title}</span>
        <span className="counter">{data.amount}</span>
        <span className="link">{data.link}</span>
      </div>
      <div className="right">
        {/* <div className="percentage positive">
          <KeyboardArrowUpOutlinedIcon />
          20%
        </div> */}
        {data.icon}
      </div>
    </div>
  )
}

export default Widget