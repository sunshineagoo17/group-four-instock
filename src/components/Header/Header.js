import React from 'react';
import logo from '../../assets/images/InStock-Logo_2x.png';
import './Header.scss';
import { NavLink, Link } from 'react-router-dom';

function Header() {
  return (
    <header>
      <nav className='main-nav page-max-width'>
        <Link to='/'>
          <img className='main-nav__logo' src={logo} alt='inStock Logo' />
        </Link>

        <ul className='main-nav-container'>
          <NavLink to='/warehouse' className='main-nav-container__link btn'>
            Warehouses
          </NavLink>
          <NavLink to='/inventory' className='main-nav-container__link btn'>
            Inventory
          </NavLink>
        </ul>
      </nav>
      <div className='header-bg'></div>
    </header>
  );
}

export default Header;
