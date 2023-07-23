import "./navbar.scss"
import SearchIcon from '@mui/icons-material/Search';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import { useContext } from "react";
import { DarkModeContext } from "../../context/darkModeContext";
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import { Tooltip } from "@mui/material";
import { useAuth } from '../../context/AuthProvider'

const Navbar = () => {

  const { dispatch } = useContext(DarkModeContext)
  const { logout } = useAuth()

  return (
    <div className='navbar'>
      <div className="wrapper">
        <div className="search">
          <input type="text" placeholder="Search..." />
          <SearchIcon />
        </div>
        <div className="items">
          {/* <div className="item">
            <LanguageOutlinedIcon className="icon" />
            English
          </div> */}
          <div className="item" onClick={() => dispatch({ type: "TOGGLE" })}>
            <Tooltip title="Modo Oscuro / Claro">
              <DarkModeOutlinedIcon className="icon" />
            </Tooltip>
          </div>
          <div className="item">
            {/* <NotificationsOutlinedIcon className="icon" /> */}
            {/* <div className="counter">1</div> */}
          </div>
          <div className="item" onClick={() => logout()}>
            <Tooltip title="Cerrar Sesión">
              <LogoutOutlinedIcon className="icon" />
            </Tooltip>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Navbar