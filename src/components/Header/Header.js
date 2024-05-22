import React from 'react';
import logo from '../../assets/images/InStock-Logo_2x.png';
import './Header.scss';
import { NavLink, Link, useLocation } from 'react-router-dom';

function Header() {
  // Get the current location to determine the active link
  const location = useLocation();

  // Check if a link should be active
  const isActiveLink = (path) => {
    if (path === '/') {
      return (
        location.pathname === '/' ||
        location.pathname.startsWith('/edit-warehouse')
      );
    }
    return location.pathname.startsWith(path);
  };

  return (
    <header>
      <nav className='main-nav page-max-width'>
        <Link to='/'>
          <img className='main-nav__logo' src={logo} alt='inStock Logo' />
        </Link>
        <ul className='main-nav-container'>
          <NavLink
            to='/'
            className={`main-nav-container__link btn ${
              isActiveLink('/') ? 'active' : ''
            }`}>
            Warehouses
          </NavLink>
          <NavLink
            to='/inventory'
            className={`main-nav-container__link btn ${
              isActiveLink('/inventory') ? 'active' : ''
            }`}>
            Inventory
          </NavLink>
        </ul>
      </nav>
      <div className='header-bg'></div>
    </header>
  );
}

export default Header;