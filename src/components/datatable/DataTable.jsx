import "./datatable.scss"
import { DataGrid, esES } from '@mui/x-data-grid';
import { userCols, userRows } from "../../users-data";
import { Link } from "react-router-dom";

const DataTable = () => {

  const actionColumn = [
    {
      field: 'action',
      headerName: 'Opciones',
      width: 135,
      renderCell: () => {
        return (
          <div className="cellActions">
            <Link to="/" style={{ textDecoration: 'none' }}>
              <div className="viewButton">View</div>
            </Link>
            <Link to="/" style={{ textDecoration: 'none' }}>
              <div className="deleteButton">Delete</div>
            </Link>
          </div>
        )
      }
    }
  ]

  return (
    <div className="datatable">
      <div className="datatableTitle">
        Add New User
        <Link to="/docente/registrarDocente" class="link">
          Add New
        </Link>
      </div>
      <DataGrid
        className="datagrid"
        localeText={esES.components.MuiDataGrid.defaultProps.localeText}
        rows={userRows}
        columns={userCols.concat(actionColumn)}
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