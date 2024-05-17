import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import InventoryList from '../../components/InventoryList/InventoryList';
import './Inventory.scss';
import InventoryItemDetails from '../../components/InventoryItemDetails/InventoryItemDetails';
import AddInventory from '../../components/AddInventory/AddInventory';

const URL = `http://127.0.0.1:8080/api`;

const Inventory = () => {
  const { inventoryId } = useParams();

  //Init InventoryList
  const [inventoryList, setInventoryList] = useState([]);
  // for Inventory Item Detail
  const [inventoryDetails, setInventoryDetails] = useState([]);

  //Fetching Data from API
  useEffect(() => {
    // for testing
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
      console.log(inventoryId);
      axios
        .get(`${URL}/inventories/${inventoryId}`)
        .then((response) => {
          const data = response.data;
          setInventoryDetails(data);
        })
        .catch((error) =>
          console.error('Error fetching inventory Item Details:', error)
        );
    }
  }, [inventoryId]);

  return (
    <div className='page-max-width'>
      Render Inventory List if InvetoryId is undefined
      {typeof inventoryId == 'undefined' && inventoryList && (
        <InventoryList inventoryList={inventoryList} />
      )}
      {inventoryId && inventoryDetails.length > 0 && (
        <InventoryItemDetails details={inventoryDetails[0]} />
      )}

    </div>
  );
};
export default Inventory;
