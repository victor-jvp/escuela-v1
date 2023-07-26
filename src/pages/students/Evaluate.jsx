import "./evaluate.scss"
import Sidebar from '../../components/sidebar/Sidebar';
import Navbar from '../../components/navbar/Navbar';
import SchoolIcon from '@mui/icons-material/School';
import { Link } from "react-router-dom";

const Evaluate = () => {
  return (
    <div className="home">
      <Sidebar />
      <div className="homeContainer">
        <Navbar />
        <div className="widgets">
          <div className="widget">
            <div className="left">
              <span className="title">Cargar nombre del proyecto</span>
              <span className="counter"></span>
              <span className="link">
                <Link style={{ textDecoration: "none" }}>Cargar...</Link>
              </span>
            </div>
            <div className="right">
              <SchoolIcon />
            </div>
          </div>
          <div className="widget">
            <div className="left">
              <span className="title">Cargar rasgos del lapso</span>
              <span className="counter"></span>
              <span className="link">
                <Link style={{ textDecoration: "none" }}>Cargar...</Link>
              </span>
            </div>
            <div className="right">
              <SchoolIcon />
            </div>
          </div>
        </div>
        <div className="widgets">
          <div className="widget">
            <div className="left">
              <span className="title">Cargar informe descriptivo</span>
              <span className="counter"></span>
              <span className="link">
                <Link style={{ textDecoration: "none" }}>Cargar...</Link>
              </span>
            </div>
            <div className="right">
              <SchoolIcon />
            </div>
          </div>
          <div className="widget">
            <div className="left">
              <span className="title">Cargar literal calificativo final</span>
              <span className="counter"></span>
              <span className="link">
                <Link style={{ textDecoration: "none" }}>Cargar...</Link>
              </span>
            </div>
            <div className="right">
              <SchoolIcon />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Evaluate