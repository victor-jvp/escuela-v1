import { useEffect } from 'react'
import { Tooltip } from '@mui/material';
import Swal from 'sweetalert2';
import Sidebar from '../../components/sidebar/Sidebar';
import Navbar from '../../components/navbar/Navbar'
import DataTable from '../../components/datatable/DataTable';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import AddReactionOutlinedIcon from '@mui/icons-material/AddReactionOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import { useStudents } from '../../context/StudentsContext'
import { useParams } from 'react-router-dom'

const ShowRepresentant = () => {
  const { students, getStudentsByRepresentant } = useStudents()
  const params = useParams()

  const tableCols = [
    // { field: 'id', headerName: 'ID', width: 70 },
    { field: 'name', headerName: 'Nombre y Apellido', width: 200 },
    { field: 'email', headerName: 'Email', width: 220 },
  ];

  const actionColumn = [
    {
      field: 'action',
      headerName: 'Opciones',
      width: 200,
      renderCell: (params) => {
        return (
          <div className="cellActions">
            <div className="viewButton" onClick={() => addStudent(params.row._id)}>
              <Tooltip title="Agregar Estudiante">
                <AddReactionOutlinedIcon />
              </Tooltip>
            </div>
            {/* <Link to={`edit/${params.row._id}`} className="viewButton">
              <Tooltip title="Modificar">
                <EditOutlinedIcon />
              </Tooltip>
            </Link> */}
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

  const addStudent = (id) => {
    alert(id)
  }

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
        // deleteRepresentant(id)
        Swal.fire(
          'Deleted!',
          'Your file has been deleted.',
          'success'
        )
      }
    })
  }

  useEffect(() => {
    getStudentsByRepresentant(params.id)
    console.log(students)
  }, [])

  return (
    <div className='list'>
      <Sidebar />
      <div className="listContainer">
        <Navbar />
        <DataTable
          title="Estudiantes de Representante"
          tableCols={tableCols}
          tableRows={students}
          createUrl={`/representants/${params.id}/create`}
          actionColumn={actionColumn}
        />
      </div>
    </div>
  )
}

export default ShowRepresentant