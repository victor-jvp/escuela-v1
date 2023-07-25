import './students.scss'
import Sidebar from '../../components/sidebar/Sidebar'
import Navbar from '../../components/navbar/Navbar'
import DataTable from '../../components/datatable/DataTable'
import { useEffect } from 'react';
import { useStudents } from '../../context/StudentsContext'
import { Tooltip } from '@mui/material';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import HourglassDisabledOutlinedIcon from '@mui/icons-material/HourglassDisabledOutlined';
import HourglassEmptyOutlinedIcon from '@mui/icons-material/HourglassEmptyOutlined';
import Swal from 'sweetalert2'

const Students = () => {

  const { getStudents, students, assignSection, removeSection } = useStudents()
  const tableCols = [
    { field: 'id', headerName: 'ID', width: 70 },
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

  const actionColumn = [
    {
      field: 'action',
      headerName: 'Opciones',
      width: 200,
      renderCell: (params) => {
        return (
          <div className="cellActions">
            <div className="viewButton" onClick={() => _assignSection(params.row._id, params.row.section)}>
              <Tooltip title="Cambiar Sección">
                <HourglassEmptyOutlinedIcon />
              </Tooltip>
            </div>
            {params.row.section && (<div className="viewButton" onClick={() => _removeSection(params.row._id)}>
              <Tooltip title="Remover Sección">
                <HourglassDisabledOutlinedIcon />
              </Tooltip>
            </div>)}
          </div>
        )
      }
    }
  ]

  const _assignSection = (id, current) => {
    Swal.fire({
      title: 'Ingrese la sección',
      input: 'text',
      inputValue: current,
      inputAttributes: {
        autocapitalize: 'off'
      },
      showCancelButton: true,
      confirmButtonText: 'Actualizar',
      showLoaderOnConfirm: true,
      preConfirm: async (data) => {
        return await assignSection(id, data)
      },
      allowOutsideClick: () => !Swal.isLoading()
    }).then((result) => {
      if (result === true) {
        // Swal.fire({
        //   title: `${result.value.login}'s avatar`,
        //   imageUrl: result.value.avatar_url
        // })
        Swal.close()
      }
    })
  }

  const _removeSection = (id) => {
    Swal.fire({
      title: 'Confirmar acción',
      text: "Confirme remover la sección del registro seleccionado",
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Confirmar',
    }).then(async (result) => {
      if (result.isConfirmed) {
        removeSection(id)
      }
    })
  }

  useEffect(() => {
    getStudents()
  }, [])

  return (
    <div className='list'>
      <Sidebar />
      <div className="listContainer">
        <Navbar />
        <DataTable
          title="Estudiantes"
          tableCols={tableCols}
          tableRows={students}
          actionColumn={actionColumn}
        />
      </div>
    </div>
  )
}

export default Students