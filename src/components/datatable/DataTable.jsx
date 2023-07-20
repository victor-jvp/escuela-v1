import "./datatable.scss"
import { DataGrid, esES } from '@mui/x-data-grid';
import { userCols, userRows } from "../../users-data";

const DataTable = () => {

  const actionColumn = [
    {
      field: 'action',
      headerName: 'Opciones',
      width: 135,
      renderCell: () => {
        return (
          <div className="cellActions">
            <div className="viewButton">View</div>
            <div className="deleteButton">Delete</div>
          </div>
        )
      }
    }
  ]

  return (
    <div className="datatable">
      <DataGrid
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