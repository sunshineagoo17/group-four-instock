import axios from 'axios';
import { useState, useEffect, useCallback } from 'react';
import { Link, useParams } from 'react-router-dom';
import './WarehouseInventoryList.scss';
import backIcon from '../../assets/images/arrow_back-24px.svg';
import editIcon from '../../assets/images/edit-24px.svg';
import sortIcon from '../../assets/images/sort-24px.svg';
import WarehouseInventoryListRow from '../WarehouseInventoryListRow/WarehouseInventoryListRow';

const WarehouseInventoryList = ({ baseURL }) => {
  const { warehouseId } = useParams();
  const [warehouseInventoryList, setWarehouseInventoryList] = useState([]);
  const [warehouseDetails, setWarehouseDetails] = useState({});
  const [sortBy, setSortBy] = useState('item_name');
  const [orderBy, setOrderBy] = useState('asc');

  // Fetching Data from API
  const fetchFn = useCallback(async () => {
    try {
      const response = await axios.get(
        `${baseURL}/warehouses/${warehouseId}/inventories?sort_by=${sortBy}&order_by=${orderBy}`
      );
      setWarehouseInventoryList(response.data);
      const detailsResponse = await axios.get(`${baseURL}/warehouses/${warehouseId}`);
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
      <div className='warehouseInventoryList__header list-padding-side'>
        <div className='warehouseInventoryList__header_title txt-header txt-bold txt-black'>
          <Link to='/'>
            <img src={backIcon} alt='go back to warehouselist' />
          </Link>
          {warehouseDetails.warehouse_name}
        </div>
        <Link to={`/edit-warehouse/${warehouseId}`} className='edit-btn'>
          <img className='edit-icon' src={editIcon} alt='edit warehouse' />
          <p className='edit-text txt-btn txt-bold'>Edit</p>
        </Link>
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
            {warehouseDetails.contact_name} <br /> {warehouseDetails.contact_position}
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
      <div className='warehouseInventory-list__filter list-padding-side'>
        <div className='warehouseInventory-list__filter_cell txt-slate txt-table txt-bold'>
          INVENTORY ITEM
          <img
            className='icon'
            src={sortIcon}
            alt='sort items'
            onClick={() => handleSort('item_name')}
          />
        </div>
        <div className='warehouseInventory-list__filter_cell txt-slate txt-table txt-bold'>
          CATEGORY
          <img
            className='icon'
            src={sortIcon}
            alt='sort categories'
            onClick={() => handleSort('category')}
          />
        </div>
        <div className='warehouseInventory-list__filter_cell txt-slate txt-table txt-bold'>
          STATUS
          <img
            className='icon'
            src={sortIcon}
            alt='sort statuses'
            onClick={() => handleSort('status')}
          />
        </div>
        <div className='warehouseInventory-list__filter_cell txt-slate txt-table txt-bold'>
          QUANTITY
          <img
            className='icon'
            src={sortIcon}
            alt='sort quantities'
            onClick={() => handleSort('quantity')}
          />
        </div>
        <div className='warehouseInventory-list__filter_cell txt-slate txt-table txt-bold'>
          ACTIONS
        </div>
      </div>
      {warehouseInventoryList.map((item, index) => (
        <WarehouseInventoryListRow
          key={item.id}
          inventory={item}
          index={index}
          baseURL={baseURL}
          fetchFn={fetchFn}
        />
      ))}
    </div>
  );
};

export default WarehouseInventoryList;