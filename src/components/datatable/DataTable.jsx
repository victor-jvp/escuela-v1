import "./datatable.scss"
import { DataGrid } from '@mui/x-data-grid/DataGrid';
import { esES } from '@mui/x-data-grid/locales/esES';
import { Link } from "react-router-dom";
import { useState } from "react";

const DataTable = ({ title, createUrl, tableCols, tableRows }) => {

  const [rows, setRows] = useState([])

  const handleDelete = (id) => {
    setRows(rows.filter((item) => item.id !== id))
  }

  const actionColumn = [
    {
      field: 'action',
      headerName: 'Opciones',
      width: 135,
      renderCell: (params) => {
        return (
          <div className="cellActions">
            <div className="viewButton">Editar</div>
            <div className="deleteButton" onClick={() => handleDelete(params.row.id)}>Borrar</div>
          </div>
        )
      }
    }
  ]

  return (
    <div className="datatable">
      <div className="datatableTitle">
        {title}
        <Link to={createUrl} class="link">
          Agregar
        </Link>
      </div>
      <DataGrid
        className="datagrid"
        localeText={esES.components.MuiDataGrid.defaultProps.localeText}
        rows={rows}
        columns={tableCols.concat(actionColumn)}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 10 },
          }
        }}
        pageSizeOptions={[10, 50, 100]}
        checkboxSelection
      />
    </div>
  )
}

export default DataTable