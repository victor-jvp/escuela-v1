import './teachers.scss'
import Sidebar from '../../components/sidebar/Sidebar'
import Navbar from '../../components/navbar/Navbar'
import DataTable from '../../components/datatable/DataTable'

const Teachers = () => {
  return (
    <div className='list'>
      <Sidebar />
      <div className="listContainer">
        <Navbar />
        <DataTable
          title="Docentes"
          createUrl="/docente/registrarDocente" />
      </div>
    </div>
  )
}

export default Teachers