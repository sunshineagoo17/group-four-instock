import './InventoryList.scss';
const InventoryList = () => {
  return (
    <div className='inventory-list'>
      <div className='inventory-list-header list-padding-side'>
        <h1 className='inventory-list-header__title txt-header txt-black '>
          Inventory
        </h1>
        <input
          className='inventory-list-header__search input'
          placeholder='Search...'
        />
        <button className='inventory-list-header__add-btn btn txt-section'>
          + Add New Item
        </button>
      </div>
       List Item will go here
    </div>
  );
};
export default InventoryList;
