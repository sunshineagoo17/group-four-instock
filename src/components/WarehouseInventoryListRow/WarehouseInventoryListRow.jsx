import './WarehouseInventoryListRow.scss';
import deleteIcon from '../../assets/images/delete_outline-24px.svg';
import editIcon from '../../assets/images/edit-24px.svg';
import rightIcon from '../../assets/images/chevron_right-24px.svg';
import { Link } from 'react-router-dom';

const WarehouseInventoryListRow = ({ inventory, index }) => {
  return (
    <>
      {/* conditional rendering based on index of map */}
      <div className={`${index === 0 ? '' : 'divider'}`}></div>
      <div className='warehouseInventory list-padding-side'>
        <div className='warehouseInventory__cell'>
          <div className='warehouseInventory__cell_header txt-slate txt-table txt-bold'>
            INVENTORY ITEM
          </div>
          <div className='warehouseInventory__cell_desc warehouseInventory__cell_desc--title txt-m txt-bold txt-indigo'>
            <Link to={`/inventory/${inventory.id}`} className='txt-indigo'>
              {inventory.item_name}{' '}
              <img
                className='right-arrow'
                src={rightIcon}
                alt='Navigate to inventory details'
              />
            </Link>
          </div>
        </div>
        <div className='warehouseInventory__cell warehouseInventory__cell'>
          <div className='warehouseInventory__cell_header txt-slate txt-table txt-bold'>
            STATUS
          </div>
          {/* conditionally add class (instock || outstock) */}
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
        <div className='warehouseInventory__cell warehouseInventory__cell'>
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
          <img
            className='warehouseInventory__cell_btn'
            src={deleteIcon}
            alt='delete button'
          />
          <img
            className='warehouseInventory__cell_btn'
            src={editIcon}
            alt='edit button'
          />
        </div>
      </div>
    </>
  );
};

export default WarehouseInventoryListRow;