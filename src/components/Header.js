import React from 'react'
import logo from '../assets/images/InStock-Logo_2x.png';
import './Header.scss';
import { useNavigate } from 'react-router-dom';

function Header() {
    const navigate = useNavigate()
  return (<>
  <header>
  <img className='instock-logo' src={logo}/>
  <div className='button-header-container'>
  <button className='header-button' onClick={()=> navigate('warehouse')} >Warehouses</button>
  <button className='header-button' onClick={()=> navigate('inventory')}>Inventory</button>
  </div>
  </header>
    
    </> )
}

export default Header