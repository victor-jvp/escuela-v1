import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import { Autocomplete, Button, InputLabel, TextField, Tooltip } from "@mui/material";
import { useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { esES } from '@mui/x-data-grid/locales/esES';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import Swal from "sweetalert2";
import { v4 as uuidv4 } from 'uuid';
import { useDirectors } from "../../context/DirectorContext";
import { useNavigate } from "react-router-dom";
import {useStudents} from '../../context/StudentsContext'
import { useEffect } from "react";

export const RegisterStudents = () => {

  const navigate = useNavigate();
  const [tableRows, setTableRows] = useState([])
  const { addSections } = useDirectors();
  const { students, getStudents } = useStudents();
  const tableCols = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "student", headerName: "Estudiante", width: 250 },
  ];

  const actionColumn = [
    {
      field: "action",
      headerName: "Opciones",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="cellActions">
            <div className="viewButton" onClick={() => deleteRow(params.row.id)}>
              <Tooltip title="Eliminar">
                <DeleteOutlineOutlinedIcon />
              </Tooltip>
            </div>
          </div>
        );
      },
    },
  ];

  const addRow = () => {
    const input = document.getElementById("student")
    const found = tableRows.find((e) => e.student === input.value);
    if (found) {
      Swal.fire("Atención", "El valor ya se encuentra registrado", "warning")
        .then(() => {
          input.focus();
          return;
        })
    }

    const row = {
      id: uuidv4(),
      student: input.value
    }
    const newTable = tableRows.concat(row);
    setTableRows(newTable)
    input.value = "";
    input.focus();
  };

  const deleteRow = (id) => {
    const newTable = tableRows.filter((e) => {
      return e.id !== id;
    })
    setTableRows(newTable);
  }

  const saveGrades = async () => {
    const data = tableRows.map((row) => ({ student: row.student }))
    const lapse = document.getElementById("lapse")
    const grade = document.getElementById("grade")
    const section = document.getElementById("section")
    if (lapse.value == "") {
      Swal.fire("Atención", "Indique el lapso a registrar", "warning")
        .then(() => {
          lapse.focus();
        })
    } else if (grade.value == "") {
      Swal.fire("Atención", "Indique el grado a registrar", "warning")
        .then(() => {
          grade.focus();
        })
    } else if (section.value == "") {
      Swal.fire("Atención", "Indique la sección a registrar", "warning")
        .then(() => {
          section.focus();
        })
    } else if (data.length <= 0) {
      Swal.fire("Atención", "Ingrese al menos 1 seccion a procesasr", "warning")
        .then(() => {
          document.getElementById("student").focus()
        })
    } else {
      console.log(lapse.value, grade.value, section.value, data)
      Swal.fire({
        title: 'Confirmar.',
        text: "Confirme realizar el proceso.",
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: 'Procesar'
      }).then(async (result) => {
        if (result.isConfirmed) {
          const resp = await addSections(lapse.value, grade.value, section.value, data);
          Swal.fire(resp.title, resp.text, resp.type).then((res) => {
            if (res.isConfirmed && resp.type === "success") navigate("/")
          });
        }
      })

    }
  }

  let studentsData = []
  
  useEffect(() => {
    getStudents();
    studentsData = students.map((e) => ({ label: `${e.nombres} ${e.apellidos}`, id: e._id }))
  },[])
  
  return (
    <div className="list">
      <Sidebar />
      <div className="listContainer">
        <Navbar />
        <div className="listContainer">
          <div className="widgets">
            <div className="widget">
              <div className="left">
                <span className="title">SELECCIONE ESTUDIANTE</span>
                <InputLabel id="demo-select-small-label">Age</InputLabel>
                <Autocomplete
                  disablePortal
                  id="student"
                  options={studentsData}
                  sx={{ width: 300 }}
                  renderInput={(params) => <TextField {...params} label="Estudiante" />}
                />
                <span className="link" onClick={addRow}>
                  Agregar.
                </span>
              </div>
              <div className="right">
              </div>
            </div>
            <div className="widget">
              <div className="left">
                <span className="title">INDIQUE EL LAPSO</span>
                <TextField
                  type="number"
                  step="1"
                  min="1"
                  id="lapse"
                  label="Ingrese el lapso"
                  variant="filled"
                  required
                  size="small"
                />
              </div>
            </div>
            <div className="widget">
              <div className="right">
                <span className="title">INDIQUE EL GRADO</span>
                <TextField
                  type="number"
                  step="1"
                  min="1"
                  id="grade"
                  label="Ingrese el grado"
                  variant="filled"
                  required
                  size="small"
                />
              </div>
            </div>
            <div className="widget">
              <div className="right">
                <span className="title">INDIQUE LA SECCION</span>
                <TextField
                  type="number"
                  step="1"
                  min="1"
                  id="section"
                  label="Ingrese el grado"
                  variant="filled"
                  required
                  size="small"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="datatable">
          <div className="datatableTitle">
            Estudiantes a Procesar
            <Button variant="outlined" onClick={saveGrades}>
              Guardar
            </Button>
          </div>
          <DataGrid
            getRowHeight={() => 'auto'}
            className="datagrid"
            localeText={esES.components.MuiDataGrid.defaultProps.localeText}
            rows={tableRows}
            columns={tableCols.concat(actionColumn)}
            columnVisibilityModel={{
              // Hide columns status and traderName, the other columns will remain visible
              status: false,
              traderName: false,
              id: false,
            }}
            initialState={{
              pagination: {
                paginationModel: { page: 0, pageSize: 10 },
              }
            }}
            pageSizeOptions={[10, 50, 100]}
            checkboxSelection
            disableRowSelectionOnClick
          // getRowId={(row) => row._id}
          />
        </div>
      </div>
    </div>
  );
};
