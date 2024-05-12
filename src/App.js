import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.scss';

//components
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';

//Page Import
import Inventory from './pages/Inventory/Inventory.js';
import Warehouse from './pages/Warehouse/Warehouse.js';
const App = () => (
  <BrowserRouter>
    <Header />
    <Routes>
      <Route path='/' element={<Warehouse />} />
      <Route path='/:warehouseId' element={<Warehouse />} />
      <Route path='/inventory' element={<Inventory />} />
    </Routes>
    <Footer />
  </BrowserRouter>
);

export default App;
