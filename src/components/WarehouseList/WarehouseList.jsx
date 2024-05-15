import './WarehouseList.scss';
const WarehouseList = () => {
  return (
    <div className='warehouse-list'>
      <div className='warehouse-list-header list-padding-side'>
        <h1 className='warehouse-list-header__title txt-header txt-black '>
          Warehouse
        </h1>
        <input
          className='warehouse-list-header__search input txt-m txt-black'
          placeholder='Search...'
        />
        <button className='warehouse-list-header__add-btn btn txt-section'>
          + Add New Item
        </button>
      </div>
       Warehouse List will go here
    </div>
  );
};
export default WarehouseList;
