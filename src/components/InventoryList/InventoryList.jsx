import InventoryListRow from '../InventoryListRow/InventoryListRow';
import { useState, useEffect,} from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './InventoryList.scss';
import sortIcon from '../../assets/images/sort-24px.svg';
import { Link } from 'react-router-dom';

const InventoryList = ({ fetchFn }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const params = new URLSearchParams(location.search);

  const [inventoryList, setInventoryList] = useState([]);
  const [sortBy, setSortBy] = useState('item_name');
  const [orderBy, setOrderBy] = useState('asc');
  const [searchTerm, setSearchTerm] = useState(params.get('s') || '');

  // Fetching Data from API whenever sortBy, orderBy or searchTerm changes
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch inventory data from the API with sorting and search parameters
        const response = await fetchFn(`/inventories?sort_by=${sortBy}&order_by=${orderBy}&s=${searchTerm}`);
        setInventoryList(response);
      } catch (error) {
        console.error('Error fetching inventory:', error);
      }
    };

    fetchData();
  }, [fetchFn, sortBy, orderBy, searchTerm]);

  // Update the URL query parameters whenever searchTerm changes
  useEffect(() => {
    const params = new URLSearchParams();
    if (searchTerm) params.set('s', searchTerm);
    navigate({ search: params.toString() });
  }, [searchTerm, navigate]);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  // Update sorting criteria
  const handleSort = (column) => {
    if (sortBy === column) {
      // Toggle between ascending and descending order
      setOrderBy(orderBy === 'asc' ? 'desc' : 'asc');
    } else {
      // Set new sorting column and default to ascending order
      setSortBy(column);
      setOrderBy('asc');
    }
  };
  
  return (
    <div className='inventory-list'>
      <div className='inventory-list-header list-padding-side'>
        <h1 className='inventory-list-header__title txt-header txt-black '>
          Inventory
        </h1>
        <input
          className='inventory-list-header__search input txt-m txt-black'
          placeholder='Search...'
          value={searchTerm}
          onChange={handleSearch}
        />
        <Link
          className='inventory-list-header__add-btn btn txt-section'
          to={'add-inventory'}>
          <button className='inventory-list-header__add-btn btn txt-section'>
            + Add New Item
          </button>
        </Link>
      </div>
      <div className='divider hide-tablet'></div>
      <div className='inventory-list__filter list-padding-side'>
        <div className='inventory-list__filter_cell txt-slate txt-table txt-bold'>
          INVENTORY ITEM
          <img className='icon' src={sortIcon} alt='sort items' onClick={() => handleSort('item_name')} />
        </div>
        <div className='inventory-list__filter_cell txt-slate txt-table txt-bold'>
          CATEGORY
          <img className='icon' src={sortIcon} alt='sort categories' onClick={() => handleSort('category')} />
        </div>
        <div className='inventory-list__filter_cell txt-slate txt-table txt-bold'>
          STATUS
          <img className='icon' src={sortIcon} alt='sort statuses' onClick={() => handleSort('status')} />
        </div>
        <div className='inventory-list__filter_cell txt-slate txt-table txt-bold'>
          QTY
          <img className='icon' src={sortIcon} alt='sort quantities' onClick={() => handleSort('quantity')} />
        </div>
        <div className='inventory-list__filter_cell txt-slate txt-table txt-bold'>
          WAREHOUSE
          <img className='icon' src={sortIcon} alt='sort warehouses' onClick={() => handleSort('warehouse_name')} />
        </div>
        <div className='inventory-list__filter_cell txt-slate txt-table txt-bold'>
          ACTIONS
        </div>
      </div>
      {inventoryList.map((item, index) => (
        <InventoryListRow inventory={item} key={index} index={index} />
      ))}
    </div>
  );
};

export default InventoryList;
