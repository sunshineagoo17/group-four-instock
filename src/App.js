import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import './App.scss';
import axios from 'axios';
// Layout
import Layout from './Layout/Layout.jsx';
// Components
import WarehouseList from './components/WarehouseList/WarehouseList.jsx';
import InventoryList from './components/InventoryList/InventoryList.jsx';
import InventoryItemDetails from './components/InventoryItemDetails/InventoryItemDetails.jsx';
import WarehouseInventoryList from './components/WarehouseInventoryList/WarehouseInventoryList.jsx';
import AddInventoryItem from './components/AddInventoryItem/AddInventoryItem.jsx';
import EditWarehouse from './components/EditWarehouse/EditWarehouse.jsx';
import AddWarehouse from './components/AddWarehouse/AddWarehouse.jsx';
import EditInventory from './components/EditInventoryItem/EditInventoryItem.jsx';

// Fetch Function
const URL = `http://127.0.0.1:8080/api`;

async function fetchData(endpoint) {
  try {
    const response = await axios.get(URL + endpoint);
    return response.data;
  } catch (error) {
    console.error('Error fetching data from ' + endpoint, error);
    return null;
  }
}

const App = () => (
  <BrowserRouter>
    <Layout>
      <Routes>
        <Route path='/' element={<Navigate to='/warehouse' />} />
        <Route
          path='/warehouse'
          element={<WarehouseList fetchFn={fetchData} baseURL={URL} />}
        />
        <Route
          path='/warehouse/:warehouseId'
          element={<WarehouseInventoryList fetchFn={fetchData} baseURL={URL} />}
        />
        <Route
          path='warehouse/edit-warehouse/:id'
          element={<EditWarehouse baseURL={URL} />}
        />
        <Route
          path='warehouse/add-warehouse/'
          element={<AddWarehouse baseURL={URL} />}
        />
        <Route
          path='/inventory'
          element={<InventoryList fetchFn={fetchData} baseURL={URL} />}
        />
        <Route
          path='/inventory/:inventoryId'
          element={<InventoryItemDetails fetchFn={fetchData} baseURL={URL} />}
        />
        <Route
          path='/inventory/add-inventory'
          element={<AddInventoryItem baseURL={URL} />}
        />
        <Route
          path='/inventory/edit-inventory/:inventoryId'
          element={<EditInventory baseURL={URL} />}
        />
      </Routes>
    </Layout>
  </BrowserRouter>
);

export default App;