import "./students.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import DataTable from "../../components/datatable/DataTable";
import { useEffect } from "react";
import { useStudents } from "../../context/StudentsContext";
import { Tooltip } from "@mui/material";
import HourglassDisabledOutlinedIcon from "@mui/icons-material/HourglassDisabledOutlined";
import HourglassEmptyOutlinedIcon from "@mui/icons-material/HourglassEmptyOutlined";
import BookOutlinedIcon from "@mui/icons-material/BookOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import LocalLibraryOutlinedIcon from "@mui/icons-material/LocalLibraryOutlined";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthProvider";

const Students = () => {
  const { user, userType } = useAuth();
  const {
    getStudents,
    students,
    assignSection,
    removeSection,
    informeDescriptivo,
    rasgosPersonales,
  } = useStudents();

  const tableCols = [
    // { field: 'id', headerName: 'ID', width: 70 },
    { field: "cedula_escolar", headerName: "Cédula Escolar", width: 130 },
    { field: "nombres", headerName: "Nombres", width: 150 },
    { field: "apellidos", headerName: "Apellidos", width: 150 },
    { field: "edad", headerName: "Edad", width: 100 },
    { field: "seccion", headerName: "Sección", width: 100 },
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
            {(userType == "director" || userType == "administrador") && (
              <>
                <div
                  className="viewButton"
                  onClick={() =>
                    _assignSection(
                      params.row.id_representante,
                      params.row._id,
                      params.row.seccion === "ninguno" ? "" : params.row.seccion
                    )
                  }
                >
                  <Tooltip title="Cambiar Sección">
                    <HourglassEmptyOutlinedIcon />
                  </Tooltip>
                </div>
                {params.row.seccion !== "ninguno" && (
                  <div
                    className="deleteButton"
                    onClick={() =>
                      _removeSection(
                        params.row.id_representante,
                        params.row._id
                      )
                    }
                  >
                    <Tooltip title="Remover Sección">
                      <HourglassDisabledOutlinedIcon />
                    </Tooltip>
                  </div>
                )}
                <Link
                  to={`/students/${params.row._id}/representants/${params.row.id_representante}`}
                  className="viewButton"
                >
                  <Tooltip title="Modificar">
                    <EditOutlinedIcon />
                  </Tooltip>
                </Link>
              </>
            )}

            {userType === "profesor" && (
              <>
                <div
                  className="viewButton"
                  onClick={() => _informeDescriptivo(params.row)}
                >
                  <Tooltip title="Informe Descriptivo">
                    <BookOutlinedIcon />
                  </Tooltip>
                </div>

                <div
                  className="viewButton"
                  onClick={() => _rasgosPersonales(params.row)}
                >
                  <Tooltip title="Rasgos Personales">
                    <LocalLibraryOutlinedIcon />
                  </Tooltip>
                </div>

                <div
                  className="viewButton"
                  onClick={() =>
                    _calificativoFinal(params.row)
                  }
                >
                  <Tooltip title="Registro Estudiantil">
                    <BookOutlinedIcon />
                  </Tooltip>
                </div>
              </>
            )}
          </div>
        );
      },
    },
  ];

  const _calificativoFinal = async (student) => {
    const { value: data } = await Swal.fire({
      title: "Cargar Informe Descriptivo",
      html: `<label class="bold">Estudiante: </label><span>${student.nombres} ${student.apellidos}</span><hr>
      <textarea id="description" class="swal2-textarea" placeholder="Descripcion..." cols="27">`,
      showCancelButton: true,
      confirmButtonText: "Procesar",
      showLoaderOnConfirm: true,
      preConfirm: async () => {
        return {
          literal_calificativo_final: document.getElementById("description").value,
        };
      },
      allowOutsideClick: () => !Swal.isLoading(),
    });

    if (data) {
      const resp = await informeDescriptivo(student.id_representante, student._id, data);
      Swal.fire(resp.title, resp.text, resp.type);
    }
  }

  const _informeDescriptivo = async (student) => {
    const { value: data } = await Swal.fire({
      title: "Cargar Informe Descriptivo",
      html: `<label class="bold">Estudiante: </label><span>${student.nombres} ${student.apellidos}</span>
      <hr><input type="number" step="1" min="1" id="lapse" class="swal2-input" placeholder="Ingrese el lapso...">
      <textarea id="description" class="swal2-textarea" placeholder="Descripcion..." cols="27">`,
      showCancelButton: true,
      confirmButtonText: "Procesar",
      showLoaderOnConfirm: true,
      preConfirm: async () => {
        return {
          lapso: document.getElementById("lapse").value,
          descripcion: document.getElementById("description").value,
        };
      },
      allowOutsideClick: () => !Swal.isLoading(),
    });

    if (data) {
      const resp = await informeDescriptivo(student._id, data);
      Swal.fire(resp.title, resp.text, resp.type);
    }
  };

  const _rasgosPersonales = async (student) => {
    const { value: data } = await Swal.fire({
      title: "Cargar Rasgos Personales",
      html: `<label class="bold">Estudiante: </label><span>${student.nombres} ${student.apellidos}</span>
      <hr><input type="number" step="1" min="1" id="lapse" class="swal2-input" placeholder="Ingrese el lapso...">
      <textarea id="description" class="swal2-textarea" placeholder="Descripcion..." cols="27">`,
      showCancelButton: true,
      confirmButtonText: "Procesar",
      showLoaderOnConfirm: true,
      preConfirm: async () => {
        return {
          lapso: document.getElementById("lapse").value,
          rasgos: document.getElementById("description").value,
        };
      },
      allowOutsideClick: () => !Swal.isLoading(),
    });

    if (data) {
      const resp = await rasgosPersonales(student._id, data);
      Swal.fire(resp.title, resp.text, resp.type);
    }
  };

  const _assignSection = (id_rep, id_est, current) => {
    Swal.fire({
      title: "Ingrese la sección",
      input: "text",
      inputValue: current,
      showCancelButton: true,
      confirmButtonText: "Actualizar",
      showLoaderOnConfirm: true,
      preConfirm: async (data) => {
        return await assignSection(id_rep, id_est, data);
      },
      allowOutsideClick: () => !Swal.isLoading(),
    }).then((result) => {
      if (result === true) {
        Swal.close();
      }
    });
  };

  const _removeSection = (id_rep, id_est) => {
    Swal.fire({
      title: "Confirmar acción",
      text: "Confirme remover la sección del registro seleccionado",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Confirmar",
    }).then(async (result) => {
      if (result.isConfirmed) {
        removeSection(id_rep, id_est);
      }
    });
  };

  useEffect(() => {
    getStudents();
  }, []);

  return (
    <div className="list">
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
  );
};

export default Students;
