import WarehouseListRow from '../WarehouseListRow/WarehouseListRow';
import WarehouseDeleteModal from '../WarehouseDeleteModal/WarehouseDeleteModal';
import { useState, useEffect } from 'react';
import axios from 'axios';
import sortIcon from '../../assets/images/sort-24px.svg';
import './WarehouseList.scss';

const WarehouseList = ({ fetchFn, baseURL }) => {
  // Init WarehouseList
  const [warehouseList, setWarehouseList] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedWarehouse, setSelectedWarehouse] = useState(null);

  // Fetching Data from API
  useEffect(() => {
    // Fetch the list of warehouses
    fetchFn('/warehouses').then((res) => setWarehouseList(res));
  }, [fetchFn]);

  // Handles delete button click and shows modal
  const handleDeleteClick = (warehouse) => {
    setSelectedWarehouse(warehouse);
    setShowModal(true);
  };

  // Closes the modal
  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedWarehouse(null);
  };

  // Confirms deletion
  const handleDeleteConfirm = async () => {
    try {
      await axios.delete(`${baseURL}/warehouses/${selectedWarehouse.id}`);
      setWarehouseList(
        warehouseList.filter((wh) => wh.id !== selectedWarehouse.id)
      );
      handleCloseModal();
    } catch (error) {
      console.error(`Error deleting warehouse: ${error.message}`);
    }
  };

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
