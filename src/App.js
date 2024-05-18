import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.scss';
import axios from 'axios';
// Layout
import Layout from './Layout/Layout.jsx';
//components
import WarehouseList from './components/WarehouseList/WarehouseList.jsx';
import InventoryList from './components/InventoryList/InventoryList.jsx';
import InventoryItemDetails from './components/InventoryItemDetails/InventoryItemDetails.jsx';

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
        <Route path='/' element={<WarehouseList fetchFn={fetchData} baseURL={URL} />} />
        {/* <Route path='/:warehouseId' element={<Warehouse />} /> */}
        <Route
          path='/inventory'
          element={<InventoryList fetchFn={fetchData} />}
        />
        <Route
          path='/inventory/:inventoryId'
          element={<InventoryItemDetails fetchFn={fetchData} />}
        />
      </Routes>
    </Layout>
  </BrowserRouter>
);

export default App;
