import "./edit-teacher.scss"
import Sidebar from '../../components/sidebar/Sidebar'
import Navbar from '../../components/navbar/Navbar'
import profilePic from '../../assets/profile-img.png'

const EditTeacher = () => {
  return (
    <div className="single">
      <Sidebar />
      <div className="singleContainer">
        <Navbar />
        <div className="top">
          <div className="left">
            <div className="editButton">Edit</div>
            <h1 className="title">Información</h1>
            <div className="item">
              <img src={profilePic} alt="avatar" className="itemImg" />
              <div className="details">
                <h1 className="itemTitle">Jane Doe Da</h1>
                <div className="detailItem">
                  <span className="itemKey">Cédula:</span>
                  <span className="itemValue">123.123.123</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Fecha Nac.:</span>
                  <span className="itemValue">01/01/2000</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Email:</span>
                  <span className="itemValue">janedoe@gmail.com</span>
                </div>
              </div>
            </div>
            Details
          </div>
          <div className="right"></div>
        </div>
        <div className="bottom"></div>
      </div>
    </div>
  )
}

export default EditTeacher