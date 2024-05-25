import axios from 'axios';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import InventoryDeleteModal from '../InventoryDeleteModal/InventoryDeleteModal';
import './WarehouseInventoryListRow.scss';
import deleteIcon from '../../assets/images/delete_outline-24px.svg';
import editIcon from '../../assets/images/edit-24px.svg';
import rightIcon from '../../assets/images/chevron_right-24px.svg';

const WarehouseInventoryListRow = ({ inventory, index, isLast, baseURL, fetchFn }) => {
  const [showModal, setShowModal] = useState(false);
  const [selectedInventory, setSelectedInventory] = useState(null);

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
      fetchFn(); // Re-fetch the data to update the list
      handleCloseModal();
    } catch (error) {
      console.error(`Error deleting inventory item: ${error.message}`);
    }
  };

  return (
    <>
      {/* Adds a divider except for the last item */}
      <div className='warehouseInventory list-padding-side'>
        <div className='warehouseInventory__cell'>
          <div className='warehouseInventory__cell_header txt-slate txt-table txt-bold'>
            INVENTORY ITEM
          </div>
          <div className='warehouseInventory__cell_desc warehouseInventory__cell_desc--title txt-m txt-bold txt-indigo'>
            <Link to={`/inventory/${inventory.id}`} className='txt-indigo warehouseInventory__name'>
              {inventory.item_name}
              <img
                className='right-arrow'
                src={rightIcon}
                alt='Navigate to inventory details'
              />
            </Link>
          </div>
        </div>
        <div className='warehouseInventory__cell'>
          <div className='warehouseInventory__cell_header txt-slate txt-table txt-bold'>
            STATUS
          </div>
          <div className='warehouseInventory__cell_desc'>
            <button
              className={`txt-table txt-bold warehouseInventory__cell_desc--btn ${
                inventory.status.toLowerCase() === 'in stock'
                  ? 'instock'
                  : 'outstock'
              }`}>
              {inventory.status}
            </button>
          </div>
        </div>
        <div className='warehouseInventory__cell'>
          <div className='warehouseInventory__cell_header txt-slate txt-table txt-bold'>
            CATEGORY
          </div>
          <div className='warehouseInventory__cell_desc warehouseInventory__cell_desc--generic txt-m txt-black txt-regular'>
            {inventory.category}
          </div>
        </div>
        <div className='warehouseInventory__cell'>
          <div className='warehouseInventory__cell_header txt-slate txt-table txt-bold'>
            QTY
          </div>
          <div className='warehouseInventory__cell_desc warehouseInventory__cell_desc--generic txt-m txt-black txt-regular'>
            {inventory.quantity}
          </div>
        </div>
        <div className='warehouseInventory__cell warehouseInventory__cell--full-width warehouseInventory__cell--flex-space-between'>
          <div className='btn-animate'>
            <img
              className='warehouseInventory__cell_btn'
              src={deleteIcon}
              alt='delete button'
              onClick={() => handleDeleteClick(inventory)}
            />
          </div>
          <Link to={`/inventory/edit-inventory/${inventory.id}`} className='edit-btn'>
            <div className='btn-animate'>
              <img
                className='warehouseInventory__cell_btn'
                src={editIcon}
                alt='edit button'
              />
            </div>
          </Link>
        </div>
      </div>
      {!isLast && <div className='divider'></div>}
      {selectedInventory && (
        <InventoryDeleteModal
          show={showModal}
          onClose={handleCloseModal}
          onDelete={handleDeleteConfirm}
          itemName={selectedInventory.item_name}
        />
      )}
    </>
  );
};

export default WarehouseInventoryListRow;