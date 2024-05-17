import WarehouseListRow from '../WarehouseListRow/WarehouseListRow';
import { useState, useEffect } from 'react';
import sortIcon from '../../assets/images/sort-24px.svg';
import './WarehouseList.scss';

const WarehouseList = ({ fetchFn }) => {
  //Init WarehouseList
  const [warehouseList, setWarehouseList] = useState([]);

  // Fetching Data from API
  useEffect(() => {
    // Fetch the list of warehouses
        fetchFn('/warehouses').then(res=> setWarehouseList(res));
    }, [fetchFn]);

  return (
    <div className='warehouse-list'>
      <div className='warehouse-list-header list-padding-side'>
        <h1 className='warehouse-list-header__title txt-header txt-black '>
          Warehouses
        </h1>
        <input
          className='warehouse-list-header__search input txt-m txt-black'
          placeholder='Search...'
        />
        <button className='warehouse-list-header__add-btn btn txt-section'>
          + Add New Warehouse
        </button>
      </div>
      <div className='divider hide-tablet'></div>
      <div className='warehouse-list__filter list-padding-side'>
        <div className='warehouse-list__filter_cell txt-slate txt-table txt-bold'>
          WAREHOUSE
          <img className='icon' src={sortIcon} alt='sort icon' />
        </div>
        <div className='warehouse-list__filter_cell txt-slate txt-table txt-bold'>
          ADDRESS
          <img className='icon' src={sortIcon} alt='sort icon' />
        </div>
        <div className='warehouse-list__filter_cell txt-slate txt-table txt-bold'>
          CONTACT NAME
          <img className='icon' src={sortIcon} alt='sort icon' />
        </div>
        <div className='warehouse-list__filter_cell txt-slate txt-table txt-bold'>
          CONTACT INFORMATION
          <img className='icon' src={sortIcon} alt='sort icon' />
        </div>
        <div className='warehouse-list__filter_cell txt-slate txt-table txt-bold'>
          ACTIONS
        </div>
      </div>
      {warehouseList.map((item, index) => (
        <WarehouseListRow warehouse={item} key={index} index={index} />
      ))}
    </div>
  );
};
export default WarehouseList;
