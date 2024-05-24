import './InventoryItemDetails.scss';
import { Link, useParams } from 'react-router-dom';
import backIcon from '../../assets/images/arrow_back-24px.svg';
import editIcon from '../../assets/images/edit-24px.svg';
import { useEffect, useState } from 'react';

const InventoryItemDetails = ({ fetchFn }) => {
  const { inventoryId } = useParams();
  const [inventoryDetails, setInventoryDetails] = useState({});

  // Fetching Data from API
  useEffect(() => {
    // Fetch inventory details
    fetchFn(`/inventories/${inventoryId}`).then((res) =>
      setInventoryDetails(res)
    );
  }, [fetchFn, inventoryId]);

  // Conditionally set the class based on the status
  const statusClass =
    inventoryDetails.status &&
    (inventoryDetails.status.toLowerCase() === 'in stock'
      ? 'instock'
      : 'outstock');

  return (
    <div className='inventoryItemDetails'>
      <div className='inventoryItemDetails__header list-padding-side'>
        <div className='inventoryItemDetails__header_title txt-header txt-bold txt-black'>
          <Link to='/inventory'>
            <img src={backIcon} alt='go back to inventory' />
          </Link>
          {inventoryDetails.item_name}
        </div>
        <Link to={`/inventory/edit-inventory/${inventoryId}`} className='edit-btn'>
          <img className='edit-icon' src={editIcon} alt='edit Item' />
          <p className='edit-text txt-btn txt-bold'>Edit</p>
        </Link>
      </div>
      <div className='divider'></div>
      <div className='detail list-padding-side'>
        <div className='detail__cell detail__cell--full-width'>
          <div className='detail__cell_header txt-slate txt-table txt-bold'>
            ITEM DESCRIPTION:
          </div>
          <div className='detail__cell_desc detail__cell_desc--title txt-m txt-regular txt-black'>
            {inventoryDetails.description}
          </div>
        </div>
        <div className='detail__cell detail__cell--full-width'>
          <div className='detail__cell_header txt-slate txt-table txt-bold'>
            CATEGORY:
          </div>
          <div className='detail__cell_desc detail__cell_desc--generic txt-m txt-black txt-regular'>
            {inventoryDetails.category}
          </div>
        </div>
        <div className='detail__cell detail__cell--half'>
          <div className='detail__cell_header txt-slate txt-table txt-bold'>
            STATUS:
          </div>
          <div className='detail__cell_desc'>
            <button
              className={`txt-table txt-bold detail__cell_desc--btn ${statusClass}`}>
              {inventoryDetails.status}
            </button>
          </div>
        </div>
        <div className='detail__cell detail__cell--half'>
          <div className='detail__cell_header txt-slate txt-table txt-bold'>
            QUANTITY:
          </div>
          <div className='detail__cell_desc detail__cell_desc--generic txt-m txt-black txt-regular'>
            {inventoryDetails.quantity}
          </div>
        </div>
        <div className='detail__cell detail__cell--full-width detail__cell--half'>
          <div className='detail__cell_header txt-slate txt-table txt-bold'>
            WAREHOUSE:
          </div>
          <div className='detail__cell_desc detail__cell_desc--generic txt-m txt-black txt-regular'>
            {inventoryDetails.warehouse_name}
          </div>
        </div>
      </div>
    </div>
  );
};

export default InventoryItemDetails;