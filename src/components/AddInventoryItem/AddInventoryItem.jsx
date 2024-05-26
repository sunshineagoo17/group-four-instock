import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Alert from '../Alert/Alert';
import './AddInventoryItem.scss';
import ArrowBack from '../../assets/images/arrow_back-24px.svg';
import errorIcon from '../../assets/images/error-24px.svg';

function AddInventoryItem({ baseURL }) {
  const navigate = useNavigate();
  const [itemName, setItemName] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [quantity, setQuantity] = useState('');
  const [warehouse, setWarehouse] = useState('');
  const [status, setStatus] = useState('In Stock');
  const [errors, setErrors] = useState({});
  const [categories, setCategories] = useState([]);
  const [warehouses, setWarehouses] = useState([]);
  const [alert, setAlert] = useState({ message: '', type: '' });

  // Fetch categories and warehouses data when the component mounts
  useEffect(() => {
    axios
      .get(`${baseURL}/categories`)
      .then((response) => setCategories(response.data))
      .catch((error) => console.error('Error fetching categories:', error));

    axios
      .get(`${baseURL}/warehouses`)
      .then((response) => setWarehouses(response.data))
      .catch((error) => console.error('Error fetching warehouses:', error));
  }, [baseURL]);

  // Changes color of placeholder text in dropdowns
  useEffect(() => {
    const selects = document.querySelectorAll('.inventory-add-select');

    selects.forEach((select) => {
      const placeholderOption = select.querySelector('option[disabled]');
      if (placeholderOption && !select.value) {
        select.classList.add('placeholder-color');
      } else {
        select.classList.remove('placeholder-color');
      }

      select.addEventListener('change', () => {
        if (!select.value) {
          select.classList.add('placeholder-color');
        } else {
          select.classList.remove('placeholder-color');
        }
      });
    });
  }, []);

  // Clear specific field error and alert
  const clearError = (field) => {
    setErrors((prevErrors) => ({ ...prevErrors, [field]: undefined }));
    setAlert({ message: '', type: '' });
  };

  const handleInputChange = (setter, field) => (event) => {
    setter(event.target.value);
    clearError(field);
  };

  const handleStatusChange = (event) => {
    setStatus(event.target.value);
    clearError('status');
    if (event.target.value === 'Out of Stock') {
      clearError('quantity');
    }
  };

  // Validate form fields
  const validateFields = () => {
    const errors = {};
    if (!itemName.trim()) errors.itemName = 'Item name is required';
    if (!description.trim()) errors.description = 'Description is required';
    if (!category) errors.category = 'Category is required';
    if (!warehouse) errors.warehouse = 'Warehouse is required';
    if (status === 'In Stock' && (!quantity || quantity <= 0)) {
      errors.quantity = 'Quantity is required and must be greater than 0';
    }
    return errors;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const validationErrors = validateFields();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setAlert({
        message: 'Please correct the errors in the form. 😔',
        type: 'error',
      });
      return;
    }

    const newItem = {
      warehouse_id: parseInt(warehouse, 10),
      item_name: itemName,
      description,
      category,
      status,
      quantity: status === 'In Stock' ? parseInt(quantity, 10) : 0,
    };

    try {
      const response = await axios.post(`${baseURL}/inventories`, newItem);
      const newItemId = response.data.id;
      setAlert({ message: 'Item added successfully 😎', type: 'success' });
      setItemName('');
      setDescription('');
      setCategory('');
      setQuantity('');
      setWarehouse('');
      setStatus('In Stock');
      setErrors({});
      // Navigate to the new item page after 3 seconds
      setTimeout(() => {
        navigate(`/inventory/${newItemId}`);
      }, 3000);
    } catch (error) {
      console.error('Error adding item:', error);
      setAlert({ message: 'Failed to add item 😔', type: 'error' });
    }
  };

  const handleCancel = (event) => {
    event.preventDefault();
    navigate('/inventory');
  };

  return (
    <div className='inventory-add box-shadow'>
      <div className='inventory-add-header list-padding-side'>
        <Link to='/inventory'>
          <img
            src={ArrowBack}
            alt='back'
            className='inventory-add__arrow-back'
          />
        </Link>
        <h1 className='inventory-add-header__title txt-header txt-black'>
          Add New Inventory Item
        </h1>
      </div>
      {alert.message && <Alert message={alert.message} type={alert.type} />}
      <div className='divider'></div>
      <form onSubmit={handleSubmit}>
        <div className='inventory-add-form__container'>
          <div className='inventory-add-form__one inventory-add-form list-padding-side'>
            <h2 className='inventory-add-title'>Item Details</h2>

            <label className='inventory-add-label'>
              <span className='inventory-add-label-txt txt-label txt-bold txt-black'>
                Item Name
              </span>
              <input
                className={`inventory-add-input input txt-m txt-black ${
                  errors.itemName ? 'input-error' : ''
                }`}
                type='text'
                onChange={handleInputChange(setItemName, 'itemName')}
                value={itemName}
                placeholder='Item Name'
              />
              {errors.itemName && (
                <span className='error txt-label'>
                  <img src={errorIcon} alt='Error Alert' />
                  {errors.itemName}
                </span>
              )}
            </label>

            <label className='inventory-add-label'>
              <span className='inventory-add-label-txt txt-label txt-bold txt-black'>
                Description
              </span>
              <textarea
                className={`inventory-add-textarea txt-m txt-black ${
                  errors.description ? 'input-error' : ''
                }`}
                onChange={handleInputChange(setDescription, 'description')}
                value={description}
                placeholder='Please enter a brief item description...'></textarea>
              {errors.description && (
                <span className='error txt-label'>
                  <img src={errorIcon} alt='Error Alert' />
                  {errors.description}
                </span>
              )}
            </label>

            <label className='inventory-add-label'>
              <span className='inventory-add-label-txt txt-label txt-bold txt-black'>
                Category
              </span>
              <select
                className={`inventory-add-select inventory-add-input custom-select-arrow input txt-m txt-black ${
                  errors.category ? 'input-error' : ''
                }`}
                onChange={handleInputChange(setCategory, 'category')}
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
                  <img src={errorIcon} alt='Error Alert' />
                  {errors.category}
                </span>
              )}
            </label>
          </div>
          <div className='divider hide--tablet'></div>

          <div className='inventory-add-form__two inventory-add-form list-padding-side'>
            <h2 className='inventory-add-title'>Item Availability</h2>

            <div className='status-inventory-add__title inventory-add-label'>
              <span className='inventory-add-label-txt txt-label txt-bold txt-black'>
                Status
              </span>
              <label
                className={`inventory-oval-container ${
                  errors.status ? 'input-error' : ''
                } ${status === 'In Stock' ? 'selected' : ''}`}>
                <input
                  type='radio'
                  name='status'
                  value='In Stock'
                  checked={status === 'In Stock'}
                  onChange={handleStatusChange}
                  className='inventory-oval-input'
                />
                <div className='inventory-add-status'>In stock</div>
              </label>
              <label
                className={`inventory-oval-container ${
                  errors.status ? 'input-error' : ''
                } ${status === 'Out of Stock' ? 'selected' : ''}`}>
                <input
                  type='radio'
                  name='status'
                  value='Out of Stock'
                  checked={status === 'Out of Stock'}
                  onChange={handleStatusChange}
                  className='inventory-oval-input'
                />
                <div className='inventory-add-status'>Out of stock</div>
              </label>
            </div>
            {status === 'In Stock' && (
              <label className='inventory-add-label'>
                <span className='inventory-add-label-txt txt-label txt-bold txt-black'>
                  Quantity
                </span>
                <input
                  className={`inventory-add-input inventory-add-input--qty input txt-m txt-black ${
                    errors.quantity ? 'input-error' : ''
                  }`}
                  type='number'
                  onChange={handleInputChange(setQuantity, 'quantity')}
                  value={quantity}
                  placeholder='0'
                />
                {errors.quantity && (
                  <span className='error txt-label'>
                    <img src={errorIcon} alt='Error Alert' />
                    {errors.quantity}
                  </span>
                )}
              </label>
            )}

            <label className='inventory-add-label'>
              <span className='inventory-add-label-txt txt-label txt-bold txt-black'>
                Warehouse
              </span>
              <select
                className={`inventory-add-select inventory-add-input custom-select-arrow input txt-m txt-black ${
                  errors.warehouse ? 'input-error' : ''
                }`}
                onChange={handleInputChange(setWarehouse, 'warehouse')}
                value={warehouse}>
                <option value='' disabled>
                  Please select
                </option>
                {warehouses.map((wh) => (
                  <option key={wh.id} value={wh.id}>
                    {wh.warehouse_name}
                  </option>
                ))}
              </select>
              {errors.warehouse && (
                <span className='error txt-label'>
                  <img src={errorIcon} alt='Error Alert' />
                  {errors.warehouse}
                </span>
              )}
            </label>
          </div>
        </div>
        <div className='inventory-add-button__container list-padding-side'>
          <button
            className='inventory-add-button inventory-add-button--cancel txt-label txt-bold'
            type='button'
            onClick={handleCancel}>
            Cancel
          </button>
          <button
            type='submit'
            className='inventory-add-button inventory-add-button--save btn txt-label txt-bold'>
            + Add Item
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddInventoryItem;