import './WarehouseInventoryList.scss';
import { Link, useParams } from 'react-router-dom';
import { useState,useEffect } from 'react';
import backIcon from '../../assets/images/arrow_back-24px.svg';
import editIcon from '../../assets/images/edit-24px.svg';
import sortIcon from '../../assets/images/sort-24px.svg';
import WarehouseInventoryListRow from '../WarehouseInventoryListRow/WarehouseInventoryListRow';




const WarehouseInventoryList = ({fetchFn}) => {
    const {warehouseId} = useParams();
    const [warehouseInventoryList, setWarehouseInventoryList] = useState([]);

    const [warehouseDetails , setWarehouseDetails ]= useState({})
      // Fetching Data from API
  useEffect(() => {
    // Fetch the list for invetory
        fetchFn(`/warehouses/${warehouseId}/inventories`).then(res=> setWarehouseInventoryList(res));
        fetchFn(`/warehouses/${warehouseId}`).then(res=> setWarehouseDetails(res));
    }, [fetchFn,warehouseId]);


    
  return (
    <div className='warehouseInventoryList'>
      <div className='warehouseInventoryList__header list-padding-side'>
        <div className='warehouseInventoryList__header_title txt-header txt-bold txt-black'>
          <Link to='/'>
            <img src={backIcon} alt='go back to warehouselist' />
          </Link>
          {warehouseDetails.warehouse_name}
        </div>
        <button className='edit-btn'>
          <img className='edit-icon' src={editIcon} alt='edit Item' />
          <p className='edit-text txt-btn txt-bold'>Edit</p>
        </button> 
      </div>
      <div className='divider'></div>
      <div className='warehouseDetails list-padding-side'>
        <div className='warehouseDetails__cell warehouseDetails__cell--full-width border-right'>
          <div className='warehouseDetails__cell_header txt-slate txt-table txt-bold'>
            WAREHOUSE ADDRESS:
          </div>
          <div className='warehouseDetails__cell_desc warehouseDetails__cell_desc--title txt-m txt-regular txt-black'>
            {warehouseDetails.address}, <br className='hide--mobile' />{warehouseDetails.city}, {warehouseDetails.country}
          </div>
        </div>
        <div className='warehouseDetails__cell warehouseDetails__cell--half '>
          <div className='warehouseDetails__cell_header txt-slate txt-table txt-bold'>
            CONTACT NAME:
          </div>
          <div className='warehouseDetails__cell_desc warehouseDetails__cell_desc--title txt-m txt-regular txt-black'>
            {warehouseDetails.contact_name} <br/> {warehouseDetails.contact_position}
          </div>
        </div>
        <div className='warehouseDetails__cell warehouseDetails__cell--half'>
          <div className='warehouseDetails__cell_header txt-slate txt-table txt-bold'>
            CONTACT INFOMATION:
          </div>
          <div className='warehouseDetails__cell_desc warehouseDetails__cell_desc--title txt-m txt-regular txt-black'>
            {warehouseDetails.contact_phone}
            <br />
            {warehouseDetails.contact_email}
          </div>
        </div>
      </div>
      <div className='divider hide--tablet'></div>
      <div className='warehouseInventory-list__filter list-padding-side'>
        <div className='warehouseInventory-list__filter_cell txt-slate txt-table txt-bold'>
          INVENTORY ITEM <img className='icon' src={sortIcon} alt='sort icon' />
        </div>
        <div className='warehouseInventory-list__filter_cell txt-slate txt-table txt-bold'>
          CATEGORY <img className='icon' src={sortIcon} alt='sort icon' />
        </div>
        <div className='warehouseInventory-list__filter_cell txt-slate txt-table txt-bold'>
          STATUS
          <img className='icon' src={sortIcon} alt='sort icon' />
        </div>
        <div className='warehouseInventory-list__filter_cell txt-slate txt-table txt-bold'>
          QUANTITY
          <img className='icon' src={sortIcon} alt='sort icon' />
        </div>
        <div className='warehouseInventory-list__filter_cell txt-slate txt-table txt-bold'>
          ACTIONS
        </div>
      </div>
      {warehouseInventoryList.map((item,index)=><WarehouseInventoryListRow inventory={item} key={index} index={index}/>)}
    </div>
  );
};
export default WarehouseInventoryList;
