import React, { useState, useEffect } from 'react';
import './EditInventoryItem.scss';
import ArrowBack from '../../assets/images/arrow_back-24px.svg';
import errorIcon from '../../assets/images/error-24px.svg';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

function findWarehouseId(warehouseName, warehouseList) {
  for (const warehouse of warehouseList) {
    if (warehouse.warehouse_name === warehouseName) {
      return warehouse.id;
    }
  }
  return null;
}

function EditInventory({ baseURL }) {
  const navigate = useNavigate();
  const { inventoryId } = useParams();
  const [itemName, setItemName] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [quantity, setQuantity] = useState('');
  const [warehouse, setWarehouse] = useState('');
  const [dataCopy, setDataCopy] = useState({});
  const [status, setStatus] = useState('');
  const [errors, setErrors] = useState({});
  const [categories, setCategories] = useState([]);
  const [warehouses, setWarehouses] = useState([]);
  const [isInputFocused, setInputFocused] = useState(false);

  useEffect(() => {
    axios
      .get(`${baseURL}/inventories/${inventoryId}`)
      .then((response) => response.data)
      .then((data) => {
        setItemName(data.item_name);
        setDescription(data.description);
        setCategory(data.category);
        setQuantity(data.quantity);
        setWarehouse(data.warehouse_name);
        setStatus(data.status);
        setDataCopy(data);
      });

    axios
      .get(`${baseURL}/categories`)
      .then((response) => setCategories(response.data))
      .catch((error) => console.error('Error fetching categories:', error));

    axios
      .get(`${baseURL}/warehouses`)
      .then((response) => setWarehouses(response.data))
      .catch((error) => console.error('Error fetching warehouses:', error));
  }, [baseURL, inventoryId]);

  const handleInputChange = (setter) => (event) => setter(event.target.value);
  const handleStatusChange = (event) => setStatus(event.target.value);

  const validateFields = () => {
    const errors = {};
    if (!itemName) errors.itemName = 'Item name is required';
    if (!description) errors.description = 'Description is required';
    if (!category) errors.category = 'Category is required';
    if (!warehouse) errors.warehouse = 'Warehouse is required';
    if (status === 'In Stock' && !quantity)
      errors.quantity = 'Quantity is required';
    return errors;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const validationErrors = validateFields();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const newItem = {
      warehouse_id: findWarehouseId(warehouse, warehouses),
      item_name: itemName,
      description,
      category,
      status,
      quantity: status === 'In Stock' ? quantity : 0,
    };

    try {
      await axios.put(`${baseURL}/inventories/${inventoryId}`, newItem);
      alert('Item updated successfully 😎');
      navigate('/inventory');
    } catch (error) {
      console.error('Error adding item:', error);
      alert('Failed to update item 😔');
    }
  };

  const handleCancel = (event) => {
    event.preventDefault();
    setItemName(dataCopy.item_name);
    setDescription(dataCopy.description);
    setCategory(dataCopy.category);
    setQuantity(dataCopy.quantity);
    setWarehouse(dataCopy.warehouse_name);
    setStatus(dataCopy.status);
  };

  // Function to handle back navigation
  const handleBackClick = () => {
    navigate(-1); 
  };

  return (
    <div className='inventory-edit box-shadow'>
      <div className='inventory-edit-header list-padding-side'>
        <img src={ArrowBack} alt='back' onClick={handleBackClick} className='inventory-edit__back-btn' />
        <h1 className='inventory-edit-header__title txt-header txt-black'>
          Edit Inventory Item
        </h1>
      </div>
      <div className='divider'></div>
      <form onSubmit={handleSubmit}>
        <div className='inventory-edit-form__container '>
          <div className='inventory-edit-form__one inventory-edit-form list-padding-side'>
            <h2 className='inventory-edit-title'>Item Details</h2>

            <label className='inventory-edit-label'>
              <span className='inventory-edit-label-txt txt-label txt-bold txt-black'>Item Name</span>
              <input
                className='inventory-edit-input input txt-m txt-black'
                type='text'
                onChange={handleInputChange(setItemName)}
                value={itemName}
                placeholder='Item Name'
                onFocus={() => setInputFocused(true)}
                onBlur={() => setInputFocused(false)}
              />
              {errors.itemName && !isInputFocused && itemName.length === 0 && (
                <span className='error txt-label'>
                  <img src={errorIcon} alt='Error Alert' />
                  {errors.itemName}
                </span>
              )}
            </label>

            <label className='inventory-edit-label'>
              <span className='inventory-edit-label-txt txt-label txt-bold txt-black'>Description</span>
              <textarea
                className='inventory-edit-textarea input txt-m txt-black'
                autoFocus
                onChange={handleInputChange(setDescription)}
                onFocus={() => setInputFocused(true)}
                onBlur={() => setInputFocused(false)}
                value={description}
                placeholder='Please enter a brief item description...'></textarea>
              {errors.description && !isInputFocused && description.length === 0 && (
                <span className='error txt-label'>
                  <img src={errorIcon} alt='' />
                  {errors.description}
                </span>
              )}
            </label>

            <label className='inventory-edit-label'>
              <span className='inventory-edit-label-txt txt-label txt-bold txt-black'>Category</span>
              <select
                className='inventory-edit-select inventory-edit-input custom-select-arrow input txt-m txt-black'
                onChange={handleInputChange(setCategory)}
                value={category}>
                <option value='' disabled>
                  Please select
                </option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.name}>
                    {cat.name}
                  </option>
                ))}
              </select>
              {errors.category && (
                <span className='error txt-label'>
                  <img src={errorIcon} alt='' />
                  {errors.category}
                </span>
              )}
            </label>
          </div>
          <div className='divider hide--tablet'></div>

          <div className='inventory-edit-form__two inventory-edit-form list-padding-side'>
            <h2 className='inventory-edit-title'>Item Availability</h2>

            <div className='status-inventory-edit__title inventory-edit-label'>
              <span className='inventory-edit-label-txt txt-label txt-bold txt-black'>Status</span>
              <label
                className={`inventory-oval-container ${status === 'In Stock' ? 'selected' : ''
                  }`}>
                <input
                  type='radio'
                  name='status'
                  value='In Stock'
                  checked={status === 'In Stock'}
                  onChange={handleStatusChange}
                  className='inventory-oval-input'
                />
                <div className='inventory-edit-status'>In stock</div>
              </label>
              <label
                className={`inventory-oval-container ${status === 'Out of Stock' ? 'selected' : ''
                  }`}>
                <input
                  type='radio'
                  name='status'
                  value='Out of Stock'
                  checked={status === 'Out of Stock'}
                  onChange={handleStatusChange}
                  className='inventory-oval-input'
                />
                <div className='inventory-edit-status'>Out of stock</div>
              </label>
            </div>
            {status === 'In Stock' && (
              <label className='inventory-edit-label'>
                <span className='inventory-edit-label-txt'>Quantity</span>
                <input
                  className='inventory-edit-input inventory-edit-input--qty input txt-m txt-black'
                  type='number'
                  onChange={handleInputChange(setQuantity)}
                  value={quantity}
                  placeholder='0'
                />
                {errors.quantity && (
                  <span className='error'>{errors.quantity}</span>
                )}
              </label>
            )}

            <label className='inventory-edit-label'>
              <span className='inventory-edit-label-txt txt-label txt-bold txt-black'>Warehouse</span>
              <select
                className='inventory-edit-select inventory-edit-input custom-select-arrow input txt-m txt-black'
                onChange={handleInputChange(setWarehouse)}
                value={warehouse}>
                <option value='' disabled>
                  Please select
                </option>
                {warehouses.map((wh) => (
                  <option key={wh.id} value={wh.warehouse_name}>
                    {wh.warehouse_name}
                  </option>
                ))}
              </select>
              {errors.warehouse && (
                <span className='error'>{errors.warehouse}</span>
              )}
            </label>
          </div>
        </div>
        <div className='inventory-edit-button__container list-padding-side'>
          <button
            className='inventory-edit-button inventory-edit-button--cancel btn txt-label txt-bold'
            type='button'
            onClick={handleCancel}>
            Cancel
          </button>
          <button
            type='submit'
            className='inventory-edit-button inventory-edit-button--save btn txt-label txt-bold'>
            Save
          </button>
        </div>
      </form>
    </div>
  );
}

export default EditInventory;