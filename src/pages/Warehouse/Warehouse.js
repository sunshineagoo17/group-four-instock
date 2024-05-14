import { useParams } from 'react-router-dom';
import './Warehouse.scss';
import WarehouseList from '../../components/WarehouseList/WarehouseList';
const Warehouse = () => {
  const { warehouseId } = useParams();

  return (
    <div className='page-max-width'>
      <WarehouseList />
    </div>
  );
};
export default Warehouse;
