import './teachers.scss'
import Sidebar from '../../components/sidebar/Sidebar'
import Navbar from '../../components/navbar/Navbar'
import DataTable from '../../components/datatable/DataTable'
import { useTeachers } from '../../context/TeachersContext'
import { useEffect } from 'react';
import ToggleOffOutlinedIcon from '@mui/icons-material/ToggleOffOutlined';
import ToggleOnOutlinedIcon from '@mui/icons-material/ToggleOnOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import { Tooltip } from "@mui/material";
import Swal from 'sweetalert2';

const Teachers = () => {

  const { getTeachers, teachers, activateTeacher, deactivateTeacher, deleteTeacher } = useTeachers()

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
      width: 135,
      renderCell: (params) => {
        return (
          <div className="cellActions">
            {
              !params.row.habilitado
                ? (<div className="viewButton" onClick={() => activate(params.row._id)}>
                  <Tooltip title="Habilitar">
                    <ToggleOnOutlinedIcon />
                  </Tooltip>
                </div>)
                : (<div className="deleteButton" onClick={() => deactivate(params.row._id)}>
                  <Tooltip title="Deshabilitar">
                    <ToggleOffOutlinedIcon />
                  </Tooltip>
                </div>)
            }
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
        Swal.fire(
          'Deleted!',
          'Your file has been deleted.',
          'success'
        )
      }
    })
  }

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