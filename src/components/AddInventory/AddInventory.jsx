import React, { useState, useEffect } from 'react';
import './AddInventory.scss';
import arrowDrop from '../../assets/images/arrow_drop_down-24px.svg';
import ArrowBack from '../../assets/images/arrow_back-24px.svg';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

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
      warehouse_id: warehouse,
      item_name: itemName,
      description,
      category,
      status,
      quantity: status === 'In Stock' ? quantity : 0,
    };

    try {
      await axios.post(`${baseURL}/inventories`, newItem);
      alert('Item added successfully 😎');
      // Clear the form
      setItemName('');
      setDescription('');
      setCategory('');
      setQuantity('');
      setWarehouse('');
      setStatus('In Stock');
      setErrors({});
      navigate('/inventory');
    } catch (error) {
      console.error('Error adding item:', error);
      alert('Failed to add item 😔');
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
      <form onSubmit={handleSubmit}>
        <div className='inventory-add-form__container'>
          <div className='inventory-add-form__one inventory-add-form'>
            <h2 className='inventory-add-title'>Item Details</h2>
            <label className='inventory-add-label'>Item Name</label>
            <br />
            <input
              className='inventory-add-input'
              type='text'
              onChange={handleInputChange(setItemName)}
              value={itemName}
              placeholder='Item Name'
            />
            {errors.itemName && (
              <span className='error'>{errors.itemName}</span>
            )}
            <br />
            <label className='inventory-add-label'>Description</label>
            <br />
            <textarea
              className='inventory-add-textarea'
              onChange={handleInputChange(setDescription)}
              value={description}
              placeholder='Please enter a brief item description...'></textarea>
            {errors.description && (
              <span className='error'>{errors.description}</span>
            )}
            <br />
            <label className='inventory-add-label'>Category</label>
            <br />
            <div className='inventory-add-icon__container'>
              <img src={arrowDrop} alt='arrow-drop' />
              <select
                className='inventory-add-select'
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
            </div>
            {errors.category && (
              <span className='error'>{errors.category}</span>
            )}
          </div>

          <div className='inventory-add-form__two inventory-add-form'>
            <h2 className='inventory-add-title'>Item Availability</h2>
            <div>Status</div>
            <div className='status-inventory-add'>
              <label
                className={`inventory-oval-container ${
                  status === 'In Stock' ? 'selected' : ''
                }`}>
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
                  status === 'Out of Stock' ? 'selected' : ''
                }`}>
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
                <label className='inventory-add-label'>Quantity</label>
                <br />
                <input
                  className='inventory-add-input'
                  type='number'
                  onChange={handleInputChange(setQuantity)}
                  value={quantity}
                  placeholder='0'
                />
                {errors.quantity && (
                  <span className='error'>{errors.quantity}</span>
                )}
                <br />
              </>
            )}
            <label className='inventory-add-label'>Warehouse</label>
            <br />
            <div className='inventory-add-icon__container'>
              <img alt='arrow-drop' src={arrowDrop} />
              <select
                className='inventory-add-select'
                onChange={handleInputChange(setWarehouse)}
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
            {errors.warehouse && (
              <span className='error'>{errors.warehouse}</span>
            )}
          </div>
        </div>
        <div className='inventory-add-button__container'>
          <button
            className='inventory-add-button inventory-add-button__one'
            type='button'
            onClick={handleCancel}>
            Cancel
          </button>
          <button
            type='submit'
            className='inventory-add-button inventory-add-button__two'>
            + Add Item
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddInventory;
