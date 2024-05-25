import axios from 'axios';
import { useState, useEffect } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import WarehouseListRow from '../WarehouseListRow/WarehouseListRow';
import WarehouseDeleteModal from '../WarehouseDeleteModal/WarehouseDeleteModal';
import './WarehouseList.scss';
import sortIcon from '../../assets/images/sort-24px.svg';

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

  // Fetch the warehouse data whenever sortBy, orderBy, or searchTerm changes
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchFn(
          `/warehouses?sort_by=${sortBy}&order_by=${orderBy}&s=${searchTerm}`
        );
        setWarehouseList(response);
      } catch (error) {
        console.error('Error fetching warehouses:', error);
      }
    };

    fetchData();
  }, [fetchFn, sortBy, orderBy, searchTerm]);

  // Updates the URL query parameters whenever searchTerm changes
  useEffect(() => {
    const cleanSearchTermForURL = (term) => {
      if (/^\+?\d.*$/.test(term)) {
        // Format phone number
        return term
          .replace(/[^\d\s-]/g, '')
          .replace('+', '')
          .replace(/\s+/g, '-');
      } else if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(term) || /@/.test(term)) {
        // Format email address
        return term.replace('@', ' ');
      }
      return term;
    };

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
      setWarehouseList(
        warehouseList.filter((wh) => wh.id !== selectedWarehouse.id)
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
  };

  // Extract numeric values from Addresses for sorting
  const extractAddressNumbers = (warehouses) => {
    return warehouses.map((warehouse) => {
      const address = warehouse.address || '';
      const addressNumber = parseInt(address.match(/\d+/) || 0, 10);
      return { ...warehouse, addressNumber };
    });
  };

  // Sorts warehouses based on the current sortBy and orderBy criteria
  const sortWarehouses = (warehouses) => {
    if (!warehouses) return [];

    if (sortBy === 'address') {
      const extracted = extractAddressNumbers(warehouses);
      return extracted.sort((a, b) => {
        const sortOrder = orderBy === 'asc' ? 1 : -1;
        return (a.addressNumber - b.addressNumber) * sortOrder;
      });
    }

    if (sortBy === 'contact_information') {
      return warehouses.sort((a, b) => {
        const sortOrder = orderBy === 'asc' ? 1 : -1;
        const aPhone = a.contact_phone || '';
        const bPhone = b.contact_phone || '';
        const aEmail = a.contact_email || '';
        const bEmail = b.contact_email || '';

        if (aPhone < bPhone) return -1 * sortOrder;
        if (aPhone > bPhone) return 1 * sortOrder;
        if (aEmail < bEmail) return -1 * sortOrder;
        if (aEmail > bEmail) return 1 * sortOrder;
        return 0;
      });
    }

    return warehouses.sort((a, b) => {
      const sortOrder = orderBy === 'asc' ? 1 : -1;
      const aValue = a[sortBy] || '';
      const bValue = b[sortBy] || '';
      if (aValue < bValue) return -1 * sortOrder;
      if (aValue > bValue) return 1 * sortOrder;
      return 0;
    });
  };

  const sortedWarehouseList = sortWarehouses(warehouseList);

  return (
    <div className='warehouse-list box-shadow'>
      <div className='warehouse-list-header list-padding-side'>
        <h1 className='warehouse-list-header__title txt-header txt-black'>
          Warehouses
        </h1>
        <input
          className='warehouse-list-header__search input txt-m txt-black'
          placeholder='Search...'
          value={searchTerm}
          onChange={handleSearch}
        />
        <Link to='/warehouse/add-warehouse' className='add-btn' title='Add a new warehouse'>
          <button className='warehouse-list-header__add-btn btn txt-section'>
            + Add New Warehouse
          </button>
        </Link>
      </div>
      <div className='divider hide-tablet'></div>
      <div className='warehouse-list__filter list-padding-side'>
        <div className='warehouse-list__filter_cell txt-slate txt-table txt-bold'>
          WAREHOUSE
          <img
            className='icon'
            src={sortIcon}
            alt='sort warehouses'
            onClick={() => handleSort('warehouse_name')}
          />
        </div>
        <div className='warehouse-list__filter_cell txt-slate txt-table txt-bold'>
          CONTACT NAME
          <img
            className='icon'
            src={sortIcon}
            alt='sort names'
            onClick={() => handleSort('contact_name')}
          />
        </div>
        <div className='warehouse-list__filter_cell txt-slate txt-table txt-bold'>
          ADDRESS
          <img
            className='icon'
            src={sortIcon}
            alt='sort addresses'
            onClick={() => handleSort('address')}
          />
        </div>
        <div className='warehouse-list__filter_cell txt-slate txt-table txt-bold'>
          CONTACT INFORMATION
          <img
            className='icon'
            src={sortIcon}
            alt='sort contact info'
            onClick={() => handleSort('contact_information')}
          />
        </div>
        <div className='warehouse-list__filter_cell txt-slate txt-table txt-bold'>
          ACTIONS
        </div>
      </div>
      {sortedWarehouseList.map((item, index) => (
        <WarehouseListRow
          warehouse={item}
          key={index}
          index={index}
          onDeleteClick={handleDeleteClick}
        />
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