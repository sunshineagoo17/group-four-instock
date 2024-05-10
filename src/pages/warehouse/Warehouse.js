import { useParams } from 'react-router-dom';
import './warehouse.scss';

const Warehouse = () => {
  const { warehouseId } = useParams();

  return <div>Warehouse id is:{warehouseId}</div>;
};
export default Warehouse;
