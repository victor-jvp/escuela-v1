import "./users.scss"
import Sidebar from '../../components/sidebar/Sidebar'
import Navbar from '../../components/navbar/Navbar'
import DataTable from "../../components/datatable/DataTable";
import { useState, useEffect } from 'react';
import { useUsers } from "../../context/UsersContext";

const Users = () => {

  // const [tableRows, setTableRows] = useState([])
  const tableCols = [
    // { field: 'id', headerName: 'ID', width: 70 },
    { field: 'name', headerName: 'Nombre y Apellido', width: 200 },
    { field: 'email', headerName: 'Email', width: 200 },
    {
      field: 'habilitado', headerName: 'Estado', width: 150,
      valueGetter: (params) => `${params.row.habilitado ? 'Activo' : 'Inactivo'}`
    }
  ];

  const { getUsers, users } = useUsers()

  useEffect(() => {
    getUsers()
  }, [])

  return (
    <div className='list'>
      <Sidebar />
      <div className="listContainer">
        <Navbar />
        <DataTable
          title="Usuarios"
          tableCols={tableCols}
          tableRows={users}
          createUrl="/users/create" />
      </div>
    </div>
  )
}

export default Users