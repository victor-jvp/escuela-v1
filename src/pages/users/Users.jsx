import "./users.scss"
import Sidebar from '../../components/sidebar/Sidebar'
import Navbar from '../../components/navbar/Navbar'
import DataTable from "../../components/datatable/DataTable";
import { useState, useEffect } from 'react';
import { useUsers } from "../../context/UsersContext";

const Users = () => {

  const { getUsers, users, activateUser, deactivateUser } = useUsers()

  const tableCols = [
    // { field: 'id', headerName: 'ID', width: 70 },
    { field: 'name', headerName: 'Nombre y Apellido', width: 200 },
    { field: 'email', headerName: 'Email', width: 200 },
    {
      field: 'habilitado', headerName: 'Estado', width: 150,
      valueGetter: (params) => `${params.row.habilitado ? 'Activo' : 'Inactivo'}`
    }
  ];
  const actionColumn = [
    {
      field: 'action',
      headerName: 'Opciones',
      width: 135,
      renderCell: (params) => {
        return (
          <div className="cellActions">
            {
              !params.row.habilitado
                ? (<div className="viewButton" onClick={() => activate(params.row._id)}>Habilitar</div>)
                : (<div className="deleteButton" onClick={() => deactivate(params.row._id)}>Deshabilitar</div>)
            }
          </div>
        )
      }
    }
  ]

  const activate = (id) => {
    activateUser(id)
    getUsers()
  }
  const deactivate = (id) => {
    deactivateUser(id)
    getUsers()
  }

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
          actionColumn={actionColumn}
          createUrl="/users/create" />
      </div>
    </div>
  )
}

export default Users