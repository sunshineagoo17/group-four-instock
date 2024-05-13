import { useParams } from 'react-router-dom';
import './Warehouse.scss';
import InventoryList from '../../components/InventoryList/InventoryList';
const Warehouse = () => {
  const { warehouseId } = useParams();

  return <div className='page-max-width'></div>;
};
export default Warehouse;
