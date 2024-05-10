import { BrowserRouter, Routes, Route } from 'react-router-dom';

import './app.scss';

//Page Import
import Warehouse from './pages/warehouse/Warehouse';
import Inventory from './pages/inventory/Inventory';
const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path='/' element={<Warehouse />} />
      <Route path='/:warehouseId' element={<Warehouse />} />
      <Route path='/inventory' element={<Inventory />} />
    </Routes>
  </BrowserRouter>
);
export default App;
