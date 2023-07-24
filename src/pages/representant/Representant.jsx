import React, { useEffect } from 'react'
import DataTable from '../../components/datatable/DataTable';
import Navbar from '../../components/navbar/Navbar';
import Sidebar from '../../components/sidebar/Sidebar';
import { useStudents } from '../../context/StudentsContext';


const Representant = () => {

  const { getRepresentants, representants } = useStudents()
  const tableCols = [
    // { field: 'id', headerName: 'ID', width: 70 },
    { field: 'cedula_escolar', headerName: 'Cedula', width: 120 },
    {
      field: 'nombres',
      headerName: 'Nombres',
      width: 200,
      renderCell: (params) => {
        return (
          <span>{params.row.nombre || ''}</span>
        )
      }
    },
    {
      field: 'apellidos',
      headerName: 'Apellidos',
      width: 200,
      renderCell: (params) => {
        return (
          <>
            <span>{params.row.apellido1 || ''} {params.row.apellido2 || ''}</span>
          </>
        )
      }
    },
    { field: 'seccion', headerName: 'Sección', width: 150 },
    { field: 'docente', headerName: 'Docente', width: 150 },
    { field: 'año_escolar', headerName: 'Año Escolar', width: 150 }
  ];

  const actionColumn = []

  useEffect(() => {
    getRepresentants()
  }, [])

  return (
    <div className='list'>
      <Sidebar />
      <div className="listContainer">
        <Navbar />
        <DataTable
          title="Representantes"
          tableCols={tableCols}
          tableRows={representants}
          createUrl={`/representants/create`}
          actionColumn={actionColumn}
        />
      </div>
    </div>
  )
}

export default Representant