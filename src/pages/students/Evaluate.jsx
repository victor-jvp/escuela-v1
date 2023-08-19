import "./evaluate.scss"
import Sidebar from '../../components/sidebar/Sidebar';
import Navbar from '../../components/navbar/Navbar';
import SchoolIcon from '@mui/icons-material/School';
import { Link } from "react-router-dom";
import { useStudents } from "../../context/StudentsContext";
import { Tooltip } from '@mui/material';
import BookOutlinedIcon from '@mui/icons-material/BookOutlined';
import ArticleOutlinedIcon from '@mui/icons-material/ArticleOutlined';
import AssignmentIndOutlinedIcon from '@mui/icons-material/AssignmentIndOutlined';
import Swal from 'sweetalert2';
import { useEffect } from "react";
import DataTable from "../../components/datatable/DataTable";
import Widget from "../../components/widget/Widget";
import { useTeachers } from "../../context/TeachersContext";

const Evaluate = () => {
  const { getStudentsByTeacher, students } = useStudents()
  const { informeDescriptivo, rasgosPersonales, proyectoEscolar } = useTeachers()
  const tableCols = [
    // { field: 'id', headerName: 'ID', width: 70 },
    { field: 'cedula_escolar', headerName: 'Cédula Escolar', width: 130 },
    { field: 'nombres', headerName: 'Nombres', width: 150 },
    { field: 'apellidos', headerName: 'Apellidos', width: 150 },
    { field: 'seccion', headerName: 'Sección', width: 100 },
    { field: 'grado', headerName: 'Grado', width: 100 },
    { field: 'año_escolar', headerName: 'Año Escolar', width: 100 }
  ];

  const actionColumn = [
    {
      field: 'action',
      headerName: 'Opciones',
      width: 200,
      renderCell: (params) => {
        return (
          <div className="cellActions">
            <div className="viewButton">
              <Tooltip title="Boletín de Calificaciones">
                <ArticleOutlinedIcon />
              </Tooltip>
            </div>
            <div className="viewButton">
              <Tooltip title="Establecer Rasgos Personales">
                <AssignmentIndOutlinedIcon />
              </Tooltip>
            </div>
            <div className="viewButton">
              <Tooltip title="Registrar Literal Calificativo Final">
                <BookOutlinedIcon />
              </Tooltip>
            </div>
          </div>
        )
      }
    }
  ]

  const _assignSection = (id_rep, id_est, current) => {
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
        // return await assignSection(id_rep, id_est, data)
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

  const _removeSection = (id_rep, id_est) => {
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
        // removeSection(id_rep, id_est)
      }
    })
  }

  const cargarInforme = async () => {
    const data = await Swal.fire({
      title: 'Rasgos Personales',
      html:
        '<input id="swal-input" class="swal2-input" placeholder="Ingrese el lapso...">' +
        '<textarea id="swal-textarea" class="swal2-textarea" placeholder="Descripcion..." cols="27">',
      showCancelButton: true,
      confirmButtonText: 'Procesar',
      showLoaderOnConfirm: true,
      allowOutsideClick: false,
      preConfirm: () => {
        return {
          "lapso": document.getElementById('swal-input').value,
          "descripcion": document.getElementById('swal-textarea').value
        }
      }
    });

    if (data.isConfirmed && data.value) {
      const res = await informeDescriptivo(data.value)
      if (res === true) {
        Swal.fire("Completado", "Proceso realizado con éxito.", "success")
      } else {
        Swal.fire("Error", "Ha ocurrido un error en el proceso", "error")
      }
    }
  }

  const cargarRasgos = async () => {
    const data = await Swal.fire({
      title: 'Rasgos Personales',
      html:
        '<input id="swal-input" class="swal2-input" placeholder="Ingrese el lapso...">' +
        '<textarea id="swal-textarea" class="swal2-textarea" placeholder="Descripcion..." cols="27">',
      showCancelButton: true,
      confirmButtonText: 'Procesar',
      showLoaderOnConfirm: true,
      allowOutsideClick: false,
      preConfirm: () => {
        return {
          "lapso": document.getElementById('swal-input').value,
          "rasgos": document.getElementById('swal-textarea').value
        }
      }
    });

    if (data.isConfirmed && data.value) {
      const res = await rasgosPersonales(data.value)
      if (res === true) {
        Swal.fire("Completado", "Proceso realizado con éxito.", "success")
      } else {
        Swal.fire("Error", "Ha ocurrido un error en el proceso", "error")
      }
    }
  }

  const cargarProyecto = async () => {
    const data = await Swal.fire({
      title: 'Proyecto Escolar',
      html:
        '<input id="swal-input" class="swal2-input" placeholder="Ingrese el nombre...">' +
        '<textarea id="swal-textarea" class="swal2-textarea" placeholder="Descripcion..." cols="27">',
      showCancelButton: true,
      confirmButtonText: 'Procesar',
      showLoaderOnConfirm: true,
      allowOutsideClick: false,
      preConfirm: () => {
        return {
          "nombre": document.getElementById('swal-input').value,
          "rasgos": document.getElementById('swal-textarea').value
        }
      }
    });

    if (data.isConfirmed && data.value) {
      const res = await proyectoEscolar(data.value)
      if (res === true) {
        Swal.fire("Completado", "Proceso realizado con éxito.", "success")
      } else {
        Swal.fire("Error", "Ha ocurrido un error en el proceso", "error")
      }
    }
  }

  useEffect(() => {
    getStudentsByTeacher()
  }, [])

  return (
    <div className='list'>
      <Sidebar />
      <div className="listContainer">
        <Navbar />
        <div className="listContainer">
          <div className="widgets">

            <div className="widget">
              <div className="left">
                <span className="title">INFORME DESCRIPTIVO</span>
                <span className="counter"></span>
                <span className="link" onClick={cargarInforme}>Cargar Informe</span>
              </div>
              <div className="right">
                {/* <div className="percentage positive">
          <KeyboardArrowUpOutlinedIcon />
          20%
        </div> */}
                <ArticleOutlinedIcon />
              </div>
            </div>

            <div className="widget">
              <div className="left">
                <span className="title">RASGOS PERSONALES</span>
                <span className="counter"></span>
                <span className="link" onClick={cargarRasgos}>Cargar Rasgos</span>
              </div>
              <div className="right">
                {/* <div className="percentage positive">
          <KeyboardArrowUpOutlinedIcon />
          20%
        </div> */}
                <ArticleOutlinedIcon />
              </div>
            </div>

            <div className="widget">
              <div className="left">
                <span className="title">PROYECTO ESCOLAR</span>
                <span className="counter"></span>
                <span className="link" onClick={cargarProyecto}>Cargar Proyecto</span>
              </div>
              <div className="right">
                {/* <div className="percentage positive">
          <KeyboardArrowUpOutlinedIcon />
          20%
        </div> */}
                <ArticleOutlinedIcon />
              </div>
            </div>

          </div>
        </div>
        <DataTable
          title="Estudiantes Asignados"
          tableCols={tableCols}
          tableRows={students}
          actionColumn={actionColumn}
        />
      </div>
    </div>
  )
}

export default Evaluate