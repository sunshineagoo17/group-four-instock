import './WarehouseListRow.scss';
import deleteIcon from '../../assets/images/delete_outline-24px.svg';
import editIcon from '../../assets/images/edit-24px.svg';
import rightIcon from '../../assets/images/chevron_right-24px.svg';
import { Link } from 'react-router-dom';

const WarehouseListRow = ({ warehouse, index, onDeleteClick }) => {
  return (
    <>
      {/* conditional rendering based on index of map */}
      <div className={`${index === 0 ? '' : 'divider'}`}></div>
      <div className='warehouse list-padding-side'>
        <div className='warehouse__cell'>
          <div className='warehouse__cell_header txt-slate txt-table txt-bold'>
            WAREHOUSE
          </div>
          <div className='warehouse__cell_desc warehouse__cell_desc--title txt-m txt-bold txt-indigo'>
            <Link to={`${warehouse.id}`} className='txt-indigo'>
              {warehouse.warehouse_name}{' '}
              <img
                className='right-arrow'
                src={rightIcon}
                alt='Navigate to warehouse details'
              />
            </Link>
          </div>
        </div>
        <div className='warehouse__cell'>
          <div className='warehouse__cell_header txt-slate txt-table txt-bold'>
            CONTACT NAME
          </div>
          <div className='warehouse__cell_desc warehouse__cell_desc--generic txt-m txt-black txt-regular'>
            {warehouse.contact_name}
          </div>
        </div>
        <div className='warehouse__cell'>
          <div className='warehouse__cell_header txt-slate txt-table txt-bold'>
            ADDRESS
          </div>
          <div className='warehouse__cell_desc warehouse__cell_desc--generic txt-m txt-black txt-regular'>
            {`${warehouse.address}, ${warehouse.city}, ${warehouse.country}`}
          </div>
        </div>
        <div className='warehouse__cell'>
          <div className='warehouse__cell_header txt-slate txt-table txt-bold'>
            CONTACT INFORMATION
          </div>
          <div className='warehouse__cell_desc warehouse__cell_desc--generic txt-m txt-black txt-regular'>
            {warehouse.contact_phone}
            <br />
            {warehouse.contact_email}
          </div>
        </div>
        <div className='warehouse__cell warehouse__cell--full-width'>
          <div className='btn-animate'>
            <img
              className='warehouse__cell_btn'
              src={deleteIcon}
              alt='delete button'
              onClick={() => onDeleteClick(warehouse)}
            />
          </div>
          <Link to={`/warehouse/edit-warehouse/${warehouse.id}`}>
            <div className='btn-animate'>
              <img
                className='warehouse__cell_btn'
                src={editIcon}
                alt='edit button'
              />
            </div>
          </Link>
        </div>
      </div>
    </>
  );
};

export default WarehouseListRow;