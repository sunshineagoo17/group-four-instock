import React, { useState, useEffect } from 'react';
import './AddInventory.scss';
import ArrowBack from '../../assets/images/arrow_back-24px.svg';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Alert from '../Alert/Alert';

function AddInventory({ baseURL }) {
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

  useEffect(() => {
    // Fetch categories and warehouses from the API
    axios
      .get(`${baseURL}/categories`)
      .then((response) => setCategories(response.data))
      .catch((error) => console.error('Error fetching categories:', error));

    axios
      .get(`${baseURL}/warehouses`)
      .then((response) => setWarehouses(response.data))
      .catch((error) => console.error('Error fetching warehouses:', error));
  }, [baseURL]);

  const clearError = (field) => {
    setErrors((prevErrors) => ({ ...prevErrors, [field]: undefined }));
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
      await axios.post(`${baseURL}/inventories`, newItem);
      setAlert({ message: 'Item added successfully 😎', type: 'success' });
      // Clear the form
      setItemName('');
      setDescription('');
      setCategory('');
      setQuantity('');
      setWarehouse('');
      setStatus('In Stock');
      setErrors({});
      setTimeout(() => {
        navigate('/inventory');
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
    <div className='inventory-add'>
      <div className='inventory-add-header list-padding-side'>
        <Link to='/inventory'>
          <img src={ArrowBack} alt='back' />
        </Link>
        <h1 className='inventory-add-header__title txt-header txt-black'>
          Add New Inventory Item
        </h1>
      </div>
      {alert.message && <Alert message={alert.message} type={alert.type} />}
      <form onSubmit={handleSubmit}>
        <div className='inventory-add-form__container'>
          <div className='inventory-add-form__one inventory-add-form'>
            <h2 className='inventory-add-title'>Item Details</h2>
            {errors.itemName && (
              <span className='error'>{errors.itemName}</span>
            )}
            <br />
            <label className='inventory-add-label'>Item Name</label>
            <br />
            <input
              className={`inventory-add-input ${
                errors.itemName ? 'input-error' : ''
              }`}
              type='text'
              onChange={handleInputChange(setItemName, 'itemName')}
              value={itemName}
              placeholder='Item Name'
            />
            <br />
            {errors.description && (
              <span className='error'>{errors.description}</span>
            )}
            <br />
            <label className='inventory-add-label'>Description</label>
            <br />
            <textarea
              className={`inventory-add-textarea ${
                errors.description ? 'input-error' : ''
              }`}
              onChange={handleInputChange(setDescription, 'description')}
              value={description}
              placeholder='Please enter a brief item description...'></textarea>
            {errors.category && (
              <span className='error'>{errors.category}</span>
            )}
            <br />
            <label className='inventory-add-label'>Category</label>
            <br />
            <select
              className={`inventory-add-select ${
                errors.category ? 'input-error' : ''
              } inventory-add-input custom-select-arrow`}
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
          </div>

          <div className='inventory-add-form__two inventory-add-form'>
            <h2 className='inventory-add-title'>Item Availability</h2>
            <div className='status-inventory-add__title'>Status</div>
            <div className='status-inventory-add'>
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
              <>
                {errors.quantity && (
                  <span className='error'>{errors.quantity}</span>
                )}
                <br />
                <label className='inventory-add-label'>Quantity</label>
                <br />
                <input
                  className={`inventory-add-input ${
                    errors.quantity ? 'input-error' : ''
                  }`}
                  type='number'
                  onChange={handleInputChange(setQuantity, 'quantity')}
                  value={quantity}
                  placeholder='0'
                />
              </>
            )}
            <br />
            {errors.warehouse && (
              <span className='error'>{errors.warehouse}</span>
            )}
            <br />
            <label className='inventory-add-label'>Warehouse</label>
            <select
              className={`inventory-add-select ${
                errors.warehouse ? 'input-error' : ''
              } inventory-add-input custom-select-arrow`}
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
          </div>
        </div>
        <div className='inventory-add-button__container'>
          <button
            className='inventory-add-button inventory-add-button__one'
            type='button'
            aria-label='Cancel'
            onClick={handleCancel}>
            Cancel
          </button>
          <button
            type='submit'
            aria-label='Submit'
            className='inventory-add-button inventory-add-button__two'>
            + Add Item
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddInventory;