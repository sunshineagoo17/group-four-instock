import { Link } from 'react-router-dom';
import './WarehouseListRow.scss';
import rightIcon from '../../assets/images/chevron_right-24px.svg';

const WarehouseListRow = ({ warehouse, index, onDeleteClick }) => {
  return (
    <>
      {/* Conditional rendering based on index of map */}
      <div className={`${index === 0 ? '' : 'divider'}`}></div>
      <div className='warehouse list-padding-side'>
        <div className='warehouse__cell'>
          <div className='warehouse__cell_header txt-slate txt-table txt-bold'>
            WAREHOUSE
          </div>
          <div className='warehouse__cell_desc warehouse__cell_desc--title txt-m txt-bold txt-indigo'>
            <Link to={`${warehouse.id}`} className='warehouse__name'>
              <span className='text'>{warehouse.warehouse_name}</span>
              <img
                className='icon right-arrow'
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
          <div className='btn-animate' onClick={() => onDeleteClick(warehouse)}>
            <svg className='warehouse__cell_btn delete-icon' width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M6 19C6 20.1 6.9 21 8 21H16C17.1 21 18 20.1 18 19V7H6V19ZM8 9H16V19H8V9ZM15.5 4L14.5 3H9.5L8.5 4H5V6H19V4H15.5Z" fill="#C94515"/>
            </svg>
          </div>
          <Link to={`/warehouse/edit-warehouse/${warehouse.id}`}>
            <div className='btn-animate'>
              <svg className='warehouse__cell_btn edit-icon' width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M3 17.25V21H6.75L17.81 9.94L14.06 6.19L3 17.25ZM20.71 7.04C21.1 6.65 21.1 6.02 20.71 5.63L18.37 3.29C17.98 2.9 17.35 2.9 16.96 3.29L15.13 5.12L18.88 8.87L20.71 7.04V7.04Z" fill="#2E66E6"/>
              </svg>
            </div>
          </Link>
        </div>
      </div>
    </>
  );
};

export default WarehouseListRow;