import './teachers.scss'
import Sidebar from '../../components/sidebar/Sidebar'
import Navbar from '../../components/navbar/Navbar'
import DataTable from '../../components/datatable/DataTable'
import { useTeachers } from '../../context/TeachersContext'
import { useEffect } from 'react';
import ToggleOffOutlinedIcon from '@mui/icons-material/ToggleOffOutlined';
import ToggleOnOutlinedIcon from '@mui/icons-material/ToggleOnOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import HourglassDisabledOutlinedIcon from '@mui/icons-material/HourglassDisabledOutlined';
import HourglassEmptyOutlinedIcon from '@mui/icons-material/HourglassEmptyOutlined';
import { Tooltip } from "@mui/material";
import Swal from 'sweetalert2';

const Teachers = () => {

  const { getTeachers, teachers, activateTeacher, deactivateTeacher, deleteTeacher, assignSection, removeSection } = useTeachers()

  const tableCols = [
    // { field: 'id', headerName: 'ID', width: 70 },
    { field: 'name', headerName: 'Nombre y Apellido', width: 200 },
    { field: 'email', headerName: 'Email', width: 200 },
    { field: 'section', headerName: 'Sección', width: 100 },
    {
      field: 'habilitado', headerName: 'Estado', width: 100,
      valueGetter: (params) => `${params.row.habilitado ? 'Activo' : 'Inactivo'}`
    }
  ];
  const actionColumn = [
    {
      field: 'action',
      headerName: 'Opciones',
      width: 200,
      renderCell: (params) => {
        return (
          <div className="cellActions">
            {
              !params.row.habilitado
                ? (<div className="viewButton" onClick={() => activateTeacher(params.row._id)}>
                  <Tooltip title="Habilitar">
                    <ToggleOnOutlinedIcon />
                  </Tooltip>
                </div>)
                : (<div className="deleteButton" onClick={() => deactivateTeacher(params.row._id)}>
                  <Tooltip title="Deshabilitar">
                    <ToggleOffOutlinedIcon />
                  </Tooltip>
                </div>)
            }
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

            <div className="deleteButton" onClick={() => deleteRow(params.row._id)}>
              <Tooltip title="Eliminar">
                <DeleteOutlineOutlinedIcon />
              </Tooltip>
            </div>
          </div>
        )
      }
    }
  ]

  const deleteRow = (id) => {
    Swal.fire({
      title: 'Eliminar registro',
      text: "Confirme eliminar el registro seleccionado",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Confirmar',
    }).then((result) => {
      if (result.isConfirmed) {
        deleteTeacher(id)
      }
    })
  }

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