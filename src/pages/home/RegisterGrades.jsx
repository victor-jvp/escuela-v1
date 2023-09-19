import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import { Button, TextField, Tooltip } from "@mui/material";
import { useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { esES } from '@mui/x-data-grid/locales/esES';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import Swal from "sweetalert2";
import { v4 as uuidv4 } from 'uuid';
import { useDirectors } from "../../context/DirectorContext";
import { useNavigate } from "react-router-dom";

export const RegisterGrades = () => {

  const navigate = useNavigate();
  const [tableRows, setTableRows] = useState([])
  const { addGrades } = useDirectors();
  const tableCols = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "grado", headerName: "Grado", width: 130 },
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
    const input = document.getElementById("grade")
    const found = tableRows.find((e) => e.grado === input.value);
    if (found) {
      Swal.fire("Atención", "El valor ya se encuentra registrado", "warning")
        .then(() => {
          input.focus();
        })
        return;
    }

    const row = {
      id: uuidv4(),
      grado: input.value
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
    const grados = tableRows.map((row) => ({ grado: parseInt(row.grado) }))
    const lapse = document.getElementById("lapse")
    console.log(lapse.value, grados)
    if (lapse.value == "") {
      Swal.fire("Atención", "Indique el lapso a registrar", "warning")
        .then(() => {
          lapse.focus();
        })
    } else if (grados.length <= 0) {
      Swal.fire("Atención", "Ingrese al menos 1 grado a procesasr", "warning")
        .then(() => {
          document.getElementById("grade").focus()
        })
    } else {
      Swal.fire({
        title: 'Confirmar.',
        text: "Confirme realizar el proceso.",
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: 'Procesar'
      }).then(async (result) => {
        if (result.isConfirmed) {
          const resp = await addGrades(lapse.value, grados);
          Swal.fire(resp.title, resp.text, resp.type).then((res) => {
            if(res.isConfirmed && resp.type === "success") navigate("/")
          });
        }
      })

    }
  }

  return (
    <div className="list">
      <Sidebar />
      <div className="listContainer">
        <Navbar />
        <div className="listContainer">
          <div className="widgets">
            <div className="widget">
              <div className="left">
                <span className="title">AGREGAR GRADO</span>
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
                <span className="link" onClick={addRow}>
                  Agregar.
                </span>
              </div>
              <div className="right">
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
          </div>
        </div>
        <div className="datatable">
          <div className="datatableTitle">
            Grados a Procesar
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
