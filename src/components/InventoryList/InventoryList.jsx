import InventoryListRow from '../InventoryListRow/InventoryListRow';
import { useState, useEffect,} from 'react';
import './InventoryList.scss';
import sortIcon from '../../assets/images/sort-24px.svg';
import { Link } from 'react-router-dom';

const InventoryList = ({ fetchFn }) => {
  const [inventoryList, setInventoryList] = useState([]);
  const [sortBy, setSortBy] = useState('item_name');
  const [orderBy, setOrderBy] = useState('asc');

  // Fetching Data from API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchFn(`/inventories?sort_by=${sortBy}&order_by=${orderBy}`);
        setInventoryList(response);
      } catch (error) {
        console.error('Error fetching inventory:', error);
      }
    };

    fetchData();
  }, [fetchFn, sortBy, orderBy]);

  const handleSort = (column) => {
    if (sortBy === column) {
      setOrderBy(orderBy === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(column);
      setOrderBy('asc');
    }
  };
  
  return (
    <div className='inventory-list'>
      <div className='inventory-list-header list-padding-side'>
        <h1 className='inventory-list-header__title txt-header txt-black '>
          Inventory
        </h1>
        <input
          className='inventory-list-header__search input txt-m txt-black'
          placeholder='Search...'
        />
        <Link
          className='inventory-list-header__add-btn btn txt-section'
          to={'add-inventory'}>
          <button className='inventory-list-header__add-btn btn txt-section'>
            + Add New Item
          </button>
        </Link>
      </div>
      <div className='divider hide-tablet'></div>
      <div className='inventory-list__filter list-padding-side'>
        <div
          className='inventory-list__filter_cell txt-slate txt-table txt-bold'
          onClick={() => handleSort('item_name')}
        >
          INVENTORY ITEM
          <img className='icon' src={sortIcon} alt='sort icon' />
        </div>
        <div
          className='inventory-list__filter_cell txt-slate txt-table txt-bold'
          onClick={() => handleSort('category')}
        >
          CATEGORY
          <img className='icon' src={sortIcon} alt='sort icon' />
        </div>
        <div
          className='inventory-list__filter_cell txt-slate txt-table txt-bold'
          onClick={() => handleSort('status')}
        >
          STATUS
          <img className='icon' src={sortIcon} alt='sort icon' />
        </div>
        <div
          className='inventory-list__filter_cell txt-slate txt-table txt-bold'
          onClick={() => handleSort('quantity')}
        >
          QTY
          <img className='icon' src={sortIcon} alt='sort icon' />
        </div>
        <div
          className='inventory-list__filter_cell txt-slate txt-table txt-bold'
          onClick={() => handleSort('warehouse_name')}
        >
          WAREHOUSE
          <img className='icon' src={sortIcon} alt='sort icon' />
        </div>
        <div className='inventory-list__filter_cell txt-slate txt-table txt-bold'>
          ACTIONS
        </div>
      </div>
      {inventoryList.map((item, index) => (
        <InventoryListRow inventory={item} key={index} index={index} />
      ))}
    </div>
  );
};

export default InventoryList;
