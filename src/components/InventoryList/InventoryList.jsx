import axios from 'axios';
import { useState, useEffect } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import InventoryListRow from '../InventoryListRow/InventoryListRow';
import InventoryDeleteModal from '../InventoryDeleteModal/InventoryDeleteModal';
import './InventoryList.scss';
import sortIcon from '../../assets/images/sort-24px.svg';

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

  // Confirms and deletes the item
  const handleDeleteConfirm = async () => {
    try {
      await axios.delete(`${baseURL}/inventories/${selectedInventory.id}`);
      // Update the inventory list by removing the deleted item
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
        <input
          className='inventory-list-header__search input txt-m txt-black'
          placeholder='Search...'
          value={searchTerm}
          onChange={handleSearch}
        />
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
          <img
            className='icon'
            src={sortIcon}
            alt='sort items'
            onClick={() => handleSort('item_name')}
          />
        </div>
        <div className='inventory-list__filter_cell txt-slate txt-table txt-bold'>
          CATEGORY
          <img
            className='icon'
            src={sortIcon}
            alt='sort categories'
            onClick={() => handleSort('category')}
          />
        </div>
        <div className='inventory-list__filter_cell txt-slate txt-table txt-bold'>
          STATUS
          <img
            className='icon'
            src={sortIcon}
            alt='sort statuses'
            onClick={() => handleSort('status')}
          />
        </div>
        <div className='inventory-list__filter_cell txt-slate txt-table txt-bold'>
          QTY
          <img
            className='icon'
            src={sortIcon}
            alt='sort quantities'
            onClick={() => handleSort('quantity')}
          />
        </div>
        <div className='inventory-list__filter_cell txt-slate txt-table txt-bold'>
          WAREHOUSE
          <img
            className='icon'
            src={sortIcon}
            alt='sort warehouses'
            onClick={() => handleSort('warehouse_name')}
          />
        </div>
        <div className='inventory-list__filter_cell txt-slate txt-table txt-bold'>
          ACTIONS
        </div>
      </div>
      {inventoryList.map((item, index) => (
        <InventoryListRow
          inventory={item}
          key={index}
          index={index}
          onDeleteClick={handleDeleteClick}
        />
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