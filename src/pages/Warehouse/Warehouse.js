import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import './Warehouse.scss';
import WarehouseList from '../../components/WarehouseList/WarehouseList';

const URL = `http://127.0.0.1:8080/api`;
const Warehouse = () => {
  const { warehouseId } = useParams();

  //Init WarehouseList
  const [warehouseList, setWarehouseList] = useState([]);

  //Fetching Data from API
  useEffect(() => {
    if (typeof warehouseId === 'undefined') {
      // Fetch the list of Inventory
      axios
        .get(`${URL}/warehouses`)
        .then((response) => {
          const data = response.data;
          setWarehouseList(data);
        })
        .catch((error) => console.error('Error fetching inventories:', error));
    } else {
      console.log(warehouseId);
    }
  }, [warehouseId]);

  return (
    <div className='page-max-width'>
      <WarehouseList warehouseList={warehouseList} />
    </div>
  );
};
export default Warehouse;
