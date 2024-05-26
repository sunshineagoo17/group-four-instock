import axios from 'axios';
import { useState, useEffect, useCallback } from 'react';
import { Link, useParams } from 'react-router-dom';
import WarehouseInventoryListRow from '../WarehouseInventoryListRow/WarehouseInventoryListRow';
import './WarehouseInventoryList.scss';
import backIcon from '../../assets/images/arrow_back-24px.svg';
import editIcon from '../../assets/images/edit-24px.svg';

const WarehouseInventoryList = ({ baseURL }) => {
  const { warehouseId } = useParams();
  const [warehouseInventoryList, setWarehouseInventoryList] = useState([]);
  const [warehouseDetails, setWarehouseDetails] = useState({});
  const [sortBy, setSortBy] = useState('item_name');
  const [orderBy, setOrderBy] = useState('asc');

  // Fetching data from API
  const fetchFn = useCallback(async () => {
    try {
      const response = await axios.get(
        `${baseURL}/warehouses/${warehouseId}/inventories?sort_by=${sortBy}&order_by=${orderBy}`
      );
      setWarehouseInventoryList(response.data);
      const detailsResponse = await axios.get(
        `${baseURL}/warehouses/${warehouseId}`
      );
      setWarehouseDetails(detailsResponse.data);
    } catch (error) {
      console.error('Error fetching inventory or warehouse details:', error);
    }
  }, [baseURL, warehouseId, sortBy, orderBy]);

  useEffect(() => {
    fetchFn();
  }, [fetchFn]);

  // Handle sorting logic
  const handleSort = (column) => {
    if (sortBy === column) {
      setOrderBy(orderBy === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(column);
      setOrderBy('asc');
    }
  };

  return (
    <div className='warehouseInventoryList'>
      <div className='warehouseInventoryList__header warehouseDetails__list-padding-side'>
        <div className='warehouseInventoryList__header_title txt-header txt-bold txt-black'>
          <Link to='/'>
            <div className='back-icon'>
              <img src={backIcon} alt='go back to warehouselist' />
            </div>
          </Link>
          {warehouseDetails.warehouse_name}
        </div>
        <div className='btn-animate-edit'>
          <Link
            to={`/warehouse/edit-warehouse/${warehouseId}`}
            className='edit-btn'>
            <img className='edit-icon' src={editIcon} alt='edit warehouse' />
            <p className='edit-text txt-btn txt-bold'>Edit</p>
          </Link>
        </div>
      </div>
      <div className='divider'></div>
      <div className='warehouseDetails list-padding-side'>
        <div className='warehouseDetails__cell warehouseDetails__cell--full-width border-right'>
          <div className='warehouseDetails__cell_header txt-slate txt-table txt-bold'>
            WAREHOUSE ADDRESS:
          </div>
          <div className='warehouseDetails__cell_desc warehouseDetails__cell_desc--title txt-m txt-regular txt-black'>
            {warehouseDetails.address}, <br className='hide--mobile' />
            {warehouseDetails.city}, {warehouseDetails.country}
          </div>
        </div>
        <div className='warehouseDetails__cell warehouseDetails__cell--half '>
          <div className='warehouseDetails__cell_header txt-slate txt-table txt-bold'>
            CONTACT NAME:
          </div>
          <div className='warehouseDetails__cell_desc warehouseDetails__cell_desc--title txt-m txt-regular txt-black'>
            {warehouseDetails.contact_name} <br />{' '}
            {warehouseDetails.contact_position}
          </div>
        </div>
        <div className='warehouseDetails__cell warehouseDetails__cell--half'>
          <div className='warehouseDetails__cell_header txt-slate txt-table txt-bold'>
            CONTACT INFORMATION:
          </div>
          <div className='warehouseDetails__cell_desc warehouseDetails__cell_desc--title txt-m txt-regular txt-black'>
            {warehouseDetails.contact_phone}
            <br />
            {warehouseDetails.contact_email}
          </div>
        </div>
      </div>
      <div className='divider hide--tablet'></div>
      {warehouseInventoryList.length > 0 && (
        // Render Inventory headers only if there are inventory items
        <div className='warehouseInventory-list__filter list-padding-side'>
          <div className='warehouseInventory-list__filter_cell txt-slate txt-table txt-bold'>
            INVENTORY ITEM
            <svg
              className={`icon ${sortBy === 'item_name' ? 'active' : ''}`}
              onClick={() => handleSort('item_name')}
              viewBox='0 0 24 24'
              fill='currentColor'
              xmlns='http://www.w3.org/2000/svg'>
              <path d='M12 5.83L15.17 9L16.58 7.59L12 3L7.41003 7.59L8.83003 9L12 5.83ZM12 18.17L8.83003 15L7.42003 16.41L12 21L16.59 16.41L15.17 15L12 18.17Z' />
            </svg>
          </div>
          <div className='warehouseInventory-list__filter_cell txt-slate txt-table txt-bold'>
            CATEGORY
            <svg
              className={`icon ${sortBy === 'category' ? 'active' : ''}`}
              onClick={() => handleSort('category')}
              viewBox='0 0 24 24'
              fill='currentColor'
              xmlns='http://www.w3.org/2000/svg'>
              <path d='M12 5.83L15.17 9L16.58 7.59L12 3L7.41003 7.59L8.83003 9L12 5.83ZM12 18.17L8.83003 15L7.42003 16.41L12 21L16.59 16.41L15.17 15L12 18.17Z' />
            </svg>
          </div>
          <div className='warehouseInventory-list__filter_cell txt-slate txt-table txt-bold'>
            STATUS
            <svg
              className={`icon ${sortBy === 'status' ? 'active' : ''}`}
              onClick={() => handleSort('status')}
              viewBox='0 0 24 24'
              fill='currentColor'
              xmlns='http://www.w3.org/2000/svg'>
              <path d='M12 5.83L15.17 9L16.58 7.59L12 3L7.41003 7.59L8.83003 9L12 5.83ZM12 18.17L8.83003 15L7.42003 16.41L12 21L16.59 16.41L15.17 15L12 18.17Z' />
            </svg>
          </div>
          <div className='warehouseInventory-list__filter_cell txt-slate txt-table txt-bold'>
            QUANTITY
            <svg
              className={`icon ${sortBy === 'quantity' ? 'active' : ''}`}
              onClick={() => handleSort('quantity')}
              viewBox='0 0 24 24'
              fill='currentColor'
              xmlns='http://www.w3.org/2000/svg'>
              <path d='M12 5.83L15.17 9L16.58 7.59L12 3L7.41003 7.59L8.83003 9L12 5.83ZM12 18.17L8.83003 15L7.42003 16.41L12 21L16.59 16.41L15.17 15L12 18.17Z' />
            </svg>
          </div>
          <div className='warehouseInventory-list__filter_cell txt-slate txt-table txt-bold'>
            ACTIONS
          </div>
        </div>
      )}
      {warehouseInventoryList.map((item, index) => (
        <div key={item.id} className='warehouseInventory-list-row-wrapper'>
          <WarehouseInventoryListRow
            inventory={item}
            index={index}
            isLast={index === warehouseInventoryList.length - 1}
            baseURL={baseURL}
            fetchFn={fetchFn}
          />
        </div>
      ))}
    </div>
  );
};

export default WarehouseInventoryList;