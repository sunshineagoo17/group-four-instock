import axios from 'axios';
import { useState, useEffect } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import InventoryListRow from '../InventoryListRow/InventoryListRow';
import InventoryDeleteModal from '../InventoryDeleteModal/InventoryDeleteModal';
import './InventoryList.scss';

const InventoryList = ({ fetchFn, baseURL }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const params = new URLSearchParams(location.search);

  const [inventoryList, setInventoryList] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedInventory, setSelectedInventory] = useState(null);
  const [sortBy, setSortBy] = useState('item_name');
  const [orderBy, setOrderBy] = useState('asc');
  const [searchTerm, setSearchTerm] = useState(params.get('s') || '');

  // Fetching inventory from API whenever sortBy, orderBy, or searchTerm changes
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchFn(
          `/inventories?sort_by=${sortBy}&order_by=${orderBy}&s=${searchTerm}`
        );
        setInventoryList(response);
      } catch (error) {
        console.error('Error fetching inventory:', error);
      }
    };

    fetchData();
  }, [fetchFn, sortBy, orderBy, searchTerm]);

  // Update the URL query parameters whenever searchTerm changes
  useEffect(() => {
    const params = new URLSearchParams();
    if (searchTerm) params.set('s', searchTerm);
    navigate({ search: params.toString() });
  }, [searchTerm, navigate]);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  // Opens the delete confirmation modal
  const handleDeleteClick = (inventory) => {
    setSelectedInventory(inventory);
    setShowModal(true);
  };

  // Closes the delete confirmation modal
  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedInventory(null);
  };

  // Confirms and deletes the selected item
  const handleDeleteConfirm = async () => {
    try {
      await axios.delete(`${baseURL}/inventories/${selectedInventory.id}`);
      // Updates the inventory list by removing the deleted item
      setInventoryList(
        inventoryList.filter((item) => item.id !== selectedInventory.id)
      );
      handleCloseModal();
    } catch (error) {
      console.error(`Error deleting inventory item: ${error.message}`);
    }
  };

  // Updates sorting criteria
  const handleSort = (column) => {
    if (sortBy === column) {
      // Toggle between ascending and descending order
      setOrderBy(orderBy === 'asc' ? 'desc' : 'asc');
    } else {
      // Set new sorting column and default to ascending order
      setSortBy(column);
      setOrderBy('asc');
    }
  };

  return (
    <div className='inventory-list box-shadow'>
      <div className='inventory-list-header list-padding-side'>
        <h1 className='inventory-list-header__title txt-header txt-black'>
          Inventory
        </h1>
        <div className='search-container-items'>
          <input
            className='search-input-items input txt-m txt-black'
            placeholder='Search...'
            value={searchTerm}
            onChange={handleSearch}
            aria-label='Search items'
          />
           <div className="search-icon-items"></div>
        </div>
        <Link
          className='inventory-list-header__add-btn btn txt-section'
          to={'/inventory/add-inventory'}>
          <button className='inventory-list-header__add-btn btn txt-section'>
            + Add New Item
          </button>
        </Link>
      </div>
      <div className='divider hide-tablet'></div>
      <div className='inventory-list__filter list-padding-side'>
        <div className='inventory-list__filter_cell txt-slate txt-table txt-bold'>
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
        <div className='inventory-list__filter_cell txt-slate txt-table txt-bold'>
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
        <div className='inventory-list__filter_cell txt-slate txt-table txt-bold'>
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
        <div className='inventory-list__filter_cell txt-slate txt-table txt-bold'>
          QTY
          <svg
            className={`icon ${sortBy === 'quantity' ? 'active' : ''}`}
            onClick={() => handleSort('quantity')}
            viewBox='0 0 24 24'
            fill='currentColor'
            xmlns='http://www.w3.org/2000/svg'>
            <path d='M12 5.83L15.17 9L16.58 7.59L12 3L7.41003 7.59L8.83003 9L12 5.83ZM12 18.17L8.83003 15L7.42003 16.41L12 21L16.59 16.41L15.17 15L12 18.17Z' />
          </svg>
        </div>
        <div className='inventory-list__filter_cell txt-slate txt-table txt-bold'>
          WAREHOUSE
          <svg
            className={`icon ${sortBy === 'warehouse_name' ? 'active' : ''}`}
            onClick={() => handleSort('warehouse_name')}
            viewBox='0 0 24 24'
            fill='currentColor'
            xmlns='http://www.w3.org/2000/svg'>
            <path d='M12 5.83L15.17 9L16.58 7.59L12 3L7.41003 7.59L8.83003 9L12 5.83ZM12 18.17L8.83003 15L7.42003 16.41L12 21L16.59 16.41L15.17 15L12 18.17Z' />
          </svg>
        </div>
        <div className='inventory-list__filter_cell txt-slate txt-table txt-bold'>
          ACTIONS
        </div>
      </div>
      {inventoryList.map((item, index) => (
        <div key={index} className='inventory-list-row-wrapper'>
          <InventoryListRow
            inventory={item}
            index={index}
            onDeleteClick={handleDeleteClick}
          />
          {/* Conditionally render the divider for all items except the last one */}
          {index !== inventoryList.length - 1 && (
            <div className='divider'></div>
          )}
        </div>
      ))}
      <InventoryDeleteModal
        show={showModal}
        onClose={handleCloseModal}
        onDelete={handleDeleteConfirm}
        itemName={selectedInventory ? selectedInventory.item_name : ''}
      />
    </div>
  );
};

export default InventoryList;