import axios from 'axios';
import { useState, useEffect } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import WarehouseListRow from '../WarehouseListRow/WarehouseListRow';
import WarehouseDeleteModal from '../WarehouseDeleteModal/WarehouseDeleteModal';
import './WarehouseList.scss';

// Extract numeric and text parts from addresses for sorting
const extractAddressParts = (address) => {
  const addressMatch = address.match(/^(\d+)?\s*(.*)/);
  const addressNumber = addressMatch[1] ? parseInt(addressMatch[1], 10) : null;
  const addressText = addressMatch[2] || address;
  return { addressNumber, addressText };
};

// Sorts warehouses based on the current sortBy and orderBy criteria
const sortWarehouses = (warehouses, sortBy, orderBy) => {
  if (!warehouses) return [];

  const sortOrder = orderBy === 'asc' ? 1 : -1;

  if (sortBy === 'address') {
    return warehouses.sort((a, b) => {
      const { addressNumber: aNumber, addressText: aText } =
        extractAddressParts(a.address);
      const { addressNumber: bNumber, addressText: bText } =
        extractAddressParts(b.address);

      // First compare by address number, putting null (letters) last
      if (aNumber !== null && bNumber !== null) {
        if (aNumber !== bNumber) {
          return (aNumber - bNumber) * sortOrder;
        }
        return aText.localeCompare(bText) * sortOrder;
      } else if (aNumber === null && bNumber === null) {
        return aText.localeCompare(bText) * sortOrder;
      } else if (aNumber === null) {
        return 1 * sortOrder;
      } else {
        return -1 * sortOrder;
      }
    });
  }

  // General sort
  return warehouses.sort((a, b) => {
    const aValue = a[sortBy]?.toLowerCase() || '';
    const bValue = b[sortBy]?.toLowerCase() || '';
    if (aValue < bValue) return -1 * sortOrder;
    if (aValue > bValue) return 1 * sortOrder;
    return 0;
  });
};

const WarehouseList = ({ fetchFn, baseURL }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const params = new URLSearchParams(location.search);

  const [warehouseList, setWarehouseList] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedWarehouse, setSelectedWarehouse] = useState(null);
  const [sortBy, setSortBy] = useState('warehouse_name');
  const [orderBy, setOrderBy] = useState('asc');
  const [searchTerm, setSearchTerm] = useState(params.get('s') || '');

  // Clean search term for URL by removing special characters and replacing spaces with dashes
  const cleanSearchTermForURL = (term) => {
    return term
      .replace(/[^\w\s]/g, '')
      .replace(/\s+/g, '-')
      .replace(/^-+|-+$/g, '');
  };

  // Fetch the warehouse data whenever sortBy, orderBy, or searchTerm changes
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchFn(
          `/warehouses?sort_by=${sortBy}&order_by=${orderBy}&s=${searchTerm}`
        );
        const sortedData = sortWarehouses(response, sortBy, orderBy);
        setWarehouseList(sortedData);
      } catch (error) {
        console.error('Error fetching warehouses:', error);
      }
    };

    fetchData();
  }, [fetchFn, sortBy, orderBy, searchTerm]);

  // Updates the URL query parameters whenever searchTerm changes
  useEffect(() => {
    const cleanedUpSearchTerm = cleanSearchTermForURL(searchTerm);
    const params = new URLSearchParams();
    if (cleanedUpSearchTerm) params.set('s', cleanedUpSearchTerm);
    navigate({ search: params.toString() }, { replace: true });
  }, [searchTerm, navigate]);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  // Opens the delete confirmation modal
  const handleDeleteClick = (warehouse) => {
    setSelectedWarehouse(warehouse);
    setShowModal(true);
  };

  // Closes the delete confirmation modal
  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedWarehouse(null);
  };

  // Confirms and deletes the warehouse
  const handleDeleteConfirm = async () => {
    try {
      await axios.delete(`${baseURL}/warehouses/${selectedWarehouse.id}`);
      // Update the warehouse list by removing the deleted warehouse
      setWarehouseList((prevList) =>
        sortWarehouses(
          prevList.filter((wh) => wh.id !== selectedWarehouse.id),
          sortBy,
          orderBy
        )
      );
      handleCloseModal();
    } catch (error) {
      console.error(`Error deleting warehouse: ${error.message}`);
    }
  };

  // Handles sorting logic
  const handleSort = (column) => {
    if (sortBy === column) {
      // Toggle between ascending and descending order
      setOrderBy(orderBy === 'asc' ? 'desc' : 'asc');
    } else {
      // Set new sorting column and default to ascending order
      setSortBy(column);
      setOrderBy('asc');
    }
    setWarehouseList((prevList) => sortWarehouses(prevList, column, orderBy));
  };

  return (
    <div className='warehouse-list box-shadow'>
      <div className='warehouse-list-header list-padding-side'>
        <h1 className='warehouse-list-header__title txt-header txt-black'>
          Warehouses
        </h1>
        <div className='search-container'>
          <input
            className='search-input input txt-m txt-black'
            placeholder='Search...'
            value={searchTerm}
            onChange={handleSearch}
            aria-label='Search warehouses'
          />
           <div className="search-icon"></div>
        </div>
        <Link
          to='/warehouse/add-warehouse'
          className='add-btn'
          title='Add a new warehouse'>
          <button className='warehouse-list-header__add-btn btn txt-section'>
            + Add New Warehouse
          </button>
        </Link>
      </div>
      <div className='divider hide-tablet'></div>
      <div className='warehouse-list__filter list-padding-side'>
        <div
          className='warehouse-list__filter_cell txt-slate txt-table txt-bold'
          aria-label='Sort by warehouse name'
          onClick={() => handleSort('warehouse_name')}>
          WAREHOUSE
          <svg
            className={`icon ${sortBy === 'warehouse_name' ? 'active' : ''}`}
            viewBox='0 0 24 24'
            fill='currentColor'
            xmlns='http://www.w3.org/2000/svg'>
            <path d='M12 5.83L15.17 9L16.58 7.59L12 3L7.41003 7.59L8.83003 9L12 5.83ZM12 18.17L8.83003 15L7.42003 16.41L12 21L16.59 16.41L15.17 15L12 18.17Z' />
          </svg>
        </div>
        <div
          className='warehouse-list__filter_cell txt-slate txt-table txt-bold'
          aria-label='Sort by contact name'
          onClick={() => handleSort('contact_name')}>
          CONTACT NAME
          <svg
            className={`icon ${sortBy === 'contact_name' ? 'active' : ''}`}
            viewBox='0 0 24 24'
            fill='currentColor'
            xmlns='http://www.w3.org/2000/svg'>
            <path d='M12 5.83L15.17 9L16.58 7.59L12 3L7.41003 7.59L8.83003 9L12 5.83ZM12 18.17L8.83003 15L7.42003 16.41L12 21L16.59 16.41L15.17 15L12 18.17Z' />
          </svg>
        </div>
        <div
          className='warehouse-list__filter_cell txt-slate txt-table txt-bold'
          aria-label='Sort by address'
          onClick={() => handleSort('address')}>
          ADDRESS
          <svg
            className={`icon ${sortBy === 'address' ? 'active' : ''}`}
            viewBox='0 0 24 24'
            fill='currentColor'
            xmlns='http://www.w3.org/2000/svg'>
            <path d='M12 5.83L15.17 9L16.58 7.59L12 3L7.41003 7.59L8.83003 9L12 5.83ZM12 18.17L8.83003 15L7.42003 16.41L12 21L16.59 16.41L15.17 15L12 18.17Z' />
          </svg>
        </div>
        <div
          className='warehouse-list__filter_cell txt-slate txt-table txt-bold'
          aria-label='Sort by contact information'
          onClick={() => handleSort('contact_information')}>
          CONTACT INFORMATION
          <svg
            className={`icon ${
              sortBy === 'contact_information' ? 'active' : ''
            }`}
            viewBox='0 0 24 24'
            fill='currentColor'
            xmlns='http://www.w3.org/2000/svg'>
            <path d='M12 5.83L15.17 9L16.58 7.59L12 3L7.41003 7.59L8.83003 9L12 5.83ZM12 18.17L8.83003 15L7.42003 16.41L12 21L16.59 16.41L15.17 15L12 18.17Z' />
          </svg>
        </div>
        <div className='warehouse-list__filter_cell txt-slate txt-table txt-bold'>
          ACTIONS
        </div>
      </div>
      {warehouseList.map((item, index) => (
        <div key={index}>
          <div className='warehouse-list-row'>
            <WarehouseListRow
              warehouse={item}
              index={index}
              onDeleteClick={handleDeleteClick}
            />
          </div>
        </div>
      ))}
      <WarehouseDeleteModal
        show={showModal}
        onClose={handleCloseModal}
        onDelete={handleDeleteConfirm}
        warehouseName={
          selectedWarehouse ? selectedWarehouse.warehouse_name : ''
        }
      />
    </div>
  );
};

export default WarehouseList;