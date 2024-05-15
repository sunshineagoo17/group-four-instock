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
  // for Inventory Item Detail
  const [inventoryDetail, setInventoryDetail] = useState([]);

  //Fetching Data from API
  useEffect(() => {
    console.log('use effect ran');
    if (typeof inventoryId === 'undefined') {
      // Fetch the list of Inventory
      axios
        .get(`${URL}/inventories`)
        .then((response) => {
          const data = response.data;
          setInventoryList(data);
        })
        .catch((error) => console.error('Error fetching inventories:', error));
    } else {
      // Fetch Item Details
      axios
        .get(`${URL}/inventories/${inventoryId}`)
        .then((response) => {
          const data = response.data;
          setInventoryDetail(data);
        })
        .catch((error) =>
          console.error('Error fetching inventory Item Details:', error)
        );
    }
  }, [inventoryId]);

  return (
    <div className='page-max-width'>
      {/* Render Inventory List if InvetoryId is undefined*/}
      {typeof inventoryId == 'undefined' && inventoryList && (
        <InventoryList inventoryList={inventoryList} />
      )}
    </div>
  );
};
export default Inventory;
