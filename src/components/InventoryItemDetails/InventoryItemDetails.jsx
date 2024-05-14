import './InventoryItemDetails.scss';
import deleteIcon from '../../assets/images/delete_outline-24px.svg';
import editIcon from '../../assets/images/edit-24px.svg';
import rightIcon from '../../assets/images/chevron_right-24px.svg'

import { Link } from 'react-router-dom';

const inventory = 
    {
      "id": 1,
      "warehouse_name": "Manhattan",
      "item_name": "Phone Charger",
      "description": "This 50\", 4K LED TV provides a crystal-clear picture and vivid colors.",
      "category": "Electronics",
      "status": "IN STOCk",
      "quantity": 500
    };
const InventoryItemDetails = () => {

  return (
    <>
    <div className="divider"></div>
    <div className='item list-padding-side'>
        <div className="item__cell">
            <div className="item__cell_header txt-slate txt-table txt-bold">INVENTORY ITEM</div>
            <div className="item__cell_desc item__cell_desc--title txt-m txt-bold txt-indigo"><Link className='txt-indigo'>{inventory.item_name} <img className='right-arrow' src={rightIcon} alt="" /></Link></div>
        </div>
        <div className="item__cell item__cell">
            <div className="item__cell_header txt-slate txt-table txt-bold">STATUS</div>
            {/* condtionally add class (instock || outstock)*/}
            <div className="item__cell_desc"><button className={`txt-table txt-bold item__cell_desc--btn ${inventory.status.toLowerCase() === 'in stock' ? 'instock':'outstock'}`}>{inventory.status}</button></div>
        </div>
        <div className="item__cell item__cell">
            <div className="item__cell_header txt-slate txt-table txt-bold">CATEGORY</div>
            <div className="item__cell_desc item__cell_desc--generic txt-m txt-black txt-regular">{inventory.category}</div>
        </div>
        <div className="item__cell">
            <div className="item__cell_header txt-slate txt-table txt-bold">QTY</div>
            <div className="item__cell_desc item__cell_desc--generic  txt-m txt-black txt-regular">{inventory.quantity}</div>
        </div>
        <div className="item__cell item__cell--full-width">
            <div className="item__cell_header txt-slate txt-table txt-bold">WAREHOUSE</div>
            <div className="item__cell_desc item__cell_desc--generic txt-m txt-black txt-regular">{inventory.warehouse_name}</div>
        </div>
        <div className="item__cell item__cell--full-width item__cell--flex-space-between">
            <img className='item__cell_btn'src={deleteIcon} alt="delete button" />
            <img className='item__cell_btn' src={editIcon} alt="edit button" />
        </div>

    </div>
    </>
  )
}
export default InventoryItemDetails