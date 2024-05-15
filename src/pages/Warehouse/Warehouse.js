import { useParams } from 'react-router-dom';
import './Warehouse.scss';
const Warehouse = () => {
  const { warehouseId } = useParams();

  return <div className='page-max-width'></div>;
};
export default Warehouse;
