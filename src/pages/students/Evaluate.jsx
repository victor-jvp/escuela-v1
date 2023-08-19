import "./evaluate.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import SchoolIcon from "@mui/icons-material/School";
import { useStudents } from "../../context/StudentsContext";
import { Tooltip } from "@mui/material";
import BookOutlinedIcon from "@mui/icons-material/BookOutlined";
import ArticleOutlinedIcon from "@mui/icons-material/ArticleOutlined";
import AssignmentIndOutlinedIcon from "@mui/icons-material/AssignmentIndOutlined";
import Swal from "sweetalert2";
import { useEffect } from "react";
import DataTable from "../../components/datatable/DataTable";
import { useTeachers } from "../../context/TeachersContext";

const Evaluate = () => {
  const { getStudentsByTeacher, students } = useStudents();
  const {
    informeDescriptivo,
    rasgosPersonales,
    proyectoEscolar,
    calificativoFinal,
  } = useTeachers();
  const tableCols = [
    // { field: 'id', headerName: 'ID', width: 70 },
    { field: "cedula_escolar", headerName: "Cédula Escolar", width: 130 },
    { field: "nombres", headerName: "Nombres", width: 150 },
    { field: "apellidos", headerName: "Apellidos", width: 150 },
    { field: "seccion", headerName: "Sección", width: 100 },
    { field: "grado", headerName: "Grado", width: 100 },
    { field: "año_escolar", headerName: "Año Escolar", width: 100 },
  ];

  const actionColumn = [
    {
      field: "action",
      headerName: "Opciones",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="cellActions">
            <div
              className="viewButton"
              onClick={() => procesarEstudiante("informe", params.row._id)}
            >
              <Tooltip title="Boletín de Calificaciones">
                <ArticleOutlinedIcon />
              </Tooltip>
            </div>
            <div
              className="viewButton"
              onClick={() => procesarEstudiante("rasgos", params.row._id)}
            >
              <Tooltip title="Establecer Rasgos Personales">
                <AssignmentIndOutlinedIcon />
              </Tooltip>
            </div>
            <div
              className="viewButton"
              onClick={() => procesarEstudiante("calificativo", params.row._id)}
            >
              <Tooltip title="Registrar Literal Calificativo Final">
                <BookOutlinedIcon />
              </Tooltip>
            </div>
          </div>
        );
      },
    },
  ];

  // string tipoSolicitud: Tipo de solicitud a procesar
  // int id: ID del estudiante
  const procesarEstudiante = async (tipo, id) => {
    const control = {
      title: "",
      html: "",
    };
    switch (tipo) {
      case "informe":
        control.title = "Informe Descriptivo";
        control.html =
          '<input id="swal-input" class="swal2-input" placeholder="Ingrese el lapso...">' +
          '<textarea id="swal-textarea" class="swal2-textarea" placeholder="Descripcion..." cols="27">';
        break;
      case "rasgos":
        control.title = "Rasgos Personales";
        control.html =
          '<input id="swal-input" class="swal2-input" placeholder="Ingrese el lapso...">' +
          '<textarea id="swal-textarea" class="swal2-textarea" placeholder="Descripcion..." cols="27">';
        break;
      case "calificativo":
        control.title = "Calificativo Final";
        control.html =
          '<input id="swal-input" class="swal2-input" placeholder="Ingrese el lapso...">' +
          '<textarea id="swal-textarea" class="swal2-textarea" placeholder="Descripcion..." cols="27">';
        break;
      default:
        control.title = "Error al procesar control";
        control.error = "Contacte al administrador del sistema.";
        control.type = "error";
        break;
    }
    // Validar opciones para el control
    if (control.error) {
      Swal.fire(control.title, control.error, control.type);
      return;
    }

    const data = await Swal.fire({
      title: control.title,
      html: control.html,
      showCancelButton: true,
      confirmButtonText: "Procesar",
      showLoaderOnConfirm: true,
      allowOutsideClick: false,
      preConfirm: () => {
        return {
          lapso: document.getElementById("swal-input").value,
          descripcion: document.getElementById("swal-textarea").value,
        };
      },
    });

    if (data.isConfirmed && data.value) {
      let res = null;
      switch (tipo) {
        case "inform":
          res = await informeDescriptivo(id, data.value);
          break;
        case "rasgos":
          res = await rasgosPersonales(id, data.value);
          break;
        case "calificativo":
          res = await calificativoFinal(id, data.value);
          break;
        default:
          break;
      }

      if (res === true) {
        Swal.fire("Completado", "Proceso realizado con éxito.", "success");
      } else {
        Swal.fire("Error", "Ha ocurrido un error en el proceso", "error");
      }
    }
  };

  const cargarProyecto = async (id) => {
    const data = await Swal.fire({
      title: "Proyecto Escolar",
      html:
        '<input id="swal-input" class="swal2-input" placeholder="Ingrese el nombre...">' +
        '<textarea id="swal-textarea" class="swal2-textarea" placeholder="Descripcion..." cols="27">',
      showCancelButton: true,
      confirmButtonText: "Procesar",
      showLoaderOnConfirm: true,
      allowOutsideClick: false,
      preConfirm: () => {
        return {
          nombre: document.getElementById("swal-input").value,
          rasgos: document.getElementById("swal-textarea").value,
        };
      },
    });

    if (data.isConfirmed && data.value) {
      const res = await proyectoEscolar(data.value);
      if (res === true) {
        Swal.fire("Completado", "Proceso realizado con éxito.", "success");
      } else {
        Swal.fire("Error", "Ha ocurrido un error en el proceso", "error");
      }
    }
  };

  useEffect(() => {
    getStudentsByTeacher();
  }, []);

  return (
    <div className="list">
      <Sidebar />
      <div className="listContainer">
        <Navbar />
        <DataTable
          title="Estudiantes Asignados"
          tableCols={tableCols}
          tableRows={students}
          actionColumn={actionColumn}
        />
      </div>
    </div>
  );
};

export default Evaluate;
