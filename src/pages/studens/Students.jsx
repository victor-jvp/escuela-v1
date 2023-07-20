import './students.scss'
import Sidebar from '../../components/sidebar/Sidebar'
import Navbar from '../../components/navbar/Navbar'
import DataTable from '../../components/datatable/DataTable'

const Students = () => {

  const idRepresentante = 0;

  return (
    <div className='list'>
      <Sidebar />
      <div className="listContainer">
        <Navbar />
        <DataTable
          title="Estudiantes"
          createUrl={`/representante/${idRepresentante}/estudiante/nuevoEstudiante`}
        />
      </div>
    </div>
  )
}

export default Students