import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import InventoryList from '../../components/InventoryList/InventoryList';
import './Inventory.scss';

const URL = `http://127.0.0.1:8000/api`;

const Inventory = () => {
  const { inventoryId } = useParams();

  //Init InventoryList
  const [inventoryList, setInventoryList] = useState([]);
  const [inventoryDetail, setInventoryDetail] = useState([]);

  //
  useEffect(() => {
    // Fetch the list of Inventory
    axios
      .get(`${URL}/inventories`)
      .then((response) => {
        const data = response.data;
        setInventoryList(data);
      })
      .catch((error) => console.error('Error fetching inventories:', error));
  }, []);

  return (
    <div className='page-max-width'>
      {typeof inventoryId == 'undefined' && inventoryList && (
        <InventoryList inventoryList={inventoryList} />
      )}
    </div>
  );
};
export default Inventory;
