import './personal.scss'
import Sidebar from '../../components/sidebar/Sidebar'
import DataTable from '../../components/datatable/DataTable'
import Navbar from '../../components/navbar/Navbar'

const Personal = () => {
    return (
        <div className='list'>
            <Sidebar />
            <div className="listContainer">
                <Navbar />
                <DataTable
                    title="Personal Administrativo"
                    createUrl="/direccion/nuevoDirector" />
            </div>
        </div>
    )
}

export default Personal