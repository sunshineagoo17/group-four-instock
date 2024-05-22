import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import './App.scss';
import axios from 'axios';
// Layout
import Layout from './Layout/Layout.jsx';
//components
import WarehouseList from './components/WarehouseList/WarehouseList.jsx';
import InventoryList from './components/InventoryList/InventoryList.jsx';
import InventoryItemDetails from './components/InventoryItemDetails/InventoryItemDetails.jsx';
import WarehouseInventoryList from './components/WarehouseInventoryList/WarehouseInventoryList.jsx';
import AddInventory from './components/AddInventory/AddInventory.jsx';
import EditWarehouse from './components/EditWarehouse/EditWarehouse.jsx';

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
          element={<WarehouseInventoryList fetchFn={fetchData} />}
        />
        <Route
          path='/edit-warehouse/:id'
          element={<EditWarehouse baseURL={URL}/>}
        />
        <Route
          path='/inventory'
          element={<InventoryList fetchFn={fetchData} />}
        />
        <Route
          path='/inventory/:inventoryId'
          element={<InventoryItemDetails fetchFn={fetchData} />}
        />
        <Route
          path='/inventory/add-inventory'
          element={<AddInventory baseURL={URL} />}
        />
      </Routes>
    </Layout>
  </BrowserRouter>
);

export default App;