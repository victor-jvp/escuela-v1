import './students.scss'
import Sidebar from '../../components/sidebar/Sidebar'
import Navbar from '../../components/navbar/Navbar'
import DataTable from '../../components/datatable/DataTable'
import { useEffect, useState } from 'react'
import axios from '../../api/axios'

const Students = () => {

  const [tableRows, setTableRows] = useState([])
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

  useEffect(() => {
    axios.get("/direccion/estudiantes").then((resp) => {
      console.log(resp.data)
    }).catch(error => {
      console.log(error)
    })
  })

  return (
    <div className='list'>
      <Sidebar />
      <div className="listContainer">
        <Navbar />
        <DataTable
          title="Estudiantes"
          tableCols={tableCols}
          tableRows={tableRows}
          setTableRows={setTableRows}
          createUrl="/students/create"
        />
      </div>
    </div>
  )
}

export default Students