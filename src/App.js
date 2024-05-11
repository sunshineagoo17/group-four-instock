import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';

import './App.scss';

//Page Import
import Inventory from './pages/Inventory/Inventory.js';
import Warehouse from './pages/Warehouse/Warehouse.js';
const App = () => (<>
  
  <BrowserRouter>
  <Header />
    <Routes>
      <Route path='/' element={<Warehouse />} />
      <Route path='/:warehouseId' element={<Warehouse />} />
      <Route path='/inventory' element={<Inventory />} />
    </Routes>
  </BrowserRouter>
  </>);
export default App;
