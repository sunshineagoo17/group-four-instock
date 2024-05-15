import InventoryListRow from '../InventoryListRow/InventoryListRow';
import './InventoryList.scss';

import sortIcon from '../../assets/images/sort-24px.svg';


const inventory =[
  {
    id: 1,
    warehouse_id: 1,
    item_name: 'Television',
    description:
      'This 50", 4K LED TV provides a crystal-clear picture and vivid colors.',
    category: 'Electronics',
    status: 'In Stock',
    quantity: 500,
  },
  {
    id: 2,
    warehouse_id: 1,
    item_name: 'Gym Bag',
    description:
      'Made out of military-grade synthetic materials, this gym bag is highly durable, water resistant, and easy to clean.',
    category: 'Gear',
    status: 'Out of Stock',
    quantity: 0,
  },
  {
    id: 3,
    warehouse_id: 1,
    item_name: 'Hoodie',
    description:
      'A simple 100% cotton hoodie, this is an essential piece for any wardrobe.',
    category: 'Apparel',
    status: 'Out of Stock',
    quantity: 0,
  },
  {
    id: 4,
    warehouse_id: "Manhattan",
    item_name: 'Keychain',
    description:
      'Made from 100% genuine leather, this keychain will keep your keys organized while keeping a classic, professional look.',
    category: 'Accessories',
    status: 'In Stock',
    quantity: 2000,
  },
  {
    id: 5,
    warehouse_id: 1,
    item_name: 'Shampoo',
    description: 'Natural shampoo made from 99% biodegradable ingredients.',
    category: 'Health',
    status: 'In Stock',
    quantity: 4350,
  },
  {
    id: 6,
    warehouse_id: 1,
    item_name: 'Phone Charger',
    description:
      'This USB-C phone charger features fast charging for the latest devices.',
    category: 'Electronics',
    status: 'In Stock',
    quantity: 10000,
  }
];
const InventoryList = () => {
  return (
    <div className='inventory-list'>
      <div className='inventory-list-header list-padding-side'>
        <h1 className='inventory-list-header__title txt-header txt-black '>
          Inventory
        </h1>
        <input
          className='inventory-list-header__search input txt-m txt-black'
          placeholder='Search...'
        />
        <button className='inventory-list-header__add-btn btn txt-section'>
          + Add New Item
        </button>
      </div>
      <div className="divider hide-tablet"></div>
      <div className="inventory-list__filter list-padding-side">
        <div className="inventory-list__filter_cell txt-slate txt-table txt-bold">INVENTORY ITEM <img className='icon' src={sortIcon} alt="sort icon" /></div>
        <div className="inventory-list__filter_cell txt-slate txt-table txt-bold">CATEGORY <img className='icon' src={sortIcon} alt="sort icon" /></div>
        <div className="inventory-list__filter_cell txt-slate txt-table txt-bold">STATUS<img className='icon' src={sortIcon} alt="sort icon" /></div>
        <div className="inventory-list__filter_cell txt-slate txt-table txt-bold">QTY<img className='icon' src={sortIcon} alt="sort icon" /></div>
        <div className="inventory-list__filter_cell txt-slate txt-table txt-bold">WHAREHOUSE<img className='icon' src={sortIcon} alt="sort icon" /></div>
        <div className="inventory-list__filter_cell txt-slate txt-table txt-bold">ACTIONS</div>
      </div>
       {inventory.map((item ,index)=><InventoryListRow inventory={item} key={index} index={index}/>)}
    </div>
  );
};
export default InventoryList;
