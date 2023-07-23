import './teachers.scss'
import Sidebar from '../../components/sidebar/Sidebar'
import Navbar from '../../components/navbar/Navbar'
import DataTable from '../../components/datatable/DataTable'
import { useTeachers } from '../../context/TeachersContext'
import { useEffect } from 'react'

const Teachers = () => {

  const { getTeachers, teachers, activateTeacher, deactivateTeacher } = useTeachers()

  const tableCols = [
    // { field: 'id', headerName: 'ID', width: 70 },
    { field: 'name', headerName: 'Nombre y Apellido', width: 200 },
    { field: 'email', headerName: 'Email', width: 200 },
    {
      field: 'habilitado', headerName: 'Estado', width: 150,
      valueGetter: (params) => `${params.row.habilitado ? 'Activo' : 'Inactivo'}`
    }
  ];
  const actionColumn = [
    {
      field: 'action',
      headerName: 'Opciones',
      width: 135,
      renderCell: (params) => {
        return (
          <div className="cellActions">
            {
              !params.row.habilitado
                ? (<div className="viewButton" onClick={() => activate(params.row._id)}>Habilitar</div>)
                : (<div className="deleteButton" onClick={() => deactivate(params.row._id)}>Deshabilitar</div>)
            }
          </div>
        )
      }
    }
  ]

  const activate = (id) => {
    activateTeacher(id)
  }

  const deactivate = (id) => {
    deactivateTeacher(id)
  }

  useEffect(() => {
    getTeachers()
  }, [])

  return (
    <div className='list'>
      <Sidebar />
      <div className="listContainer">
        <Navbar />
        <DataTable
          title="Profesores"
          tableCols={tableCols}
          tableRows={teachers}
          actionColumn={actionColumn}
          createUrl="/teachers/create" />
      </div>
    </div>
  )
}

export default Teachers