import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Alert from '../Alert/Alert';
import './EditInventoryItem.scss';
import ArrowBack from '../../assets/images/arrow_back-24px.svg';
import errorIcon from '../../assets/images/error-24px.svg';

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

  // State variables for form data and UI state
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
  const [alert, setAlert] = useState({ message: '', type: '' });

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

    // Fetch categories list
    axios
      .get(`${baseURL}/categories`)
      .then((response) => setCategories(response.data))
      .catch((error) => console.error('Error fetching categories:', error));

    axios
      .get(`${baseURL}/warehouses`)
      .then((response) => setWarehouses(response.data))
      .catch((error) => console.error('Error fetching warehouses:', error));
  }, [baseURL, inventoryId]);

  // Function to clear error for a specific field
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

  // Function to validate form fields
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

  // Function to handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();
  
    const validationErrors = validateFields();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setAlert({ message: 'Please correct the errors in the form. 😔', type: 'error' });
      return;
    }
  
    const updatedItem = {
      warehouse_id: findWarehouseId(warehouse, warehouses),
      item_name: itemName,
      description,
      category,
      status,
      quantity: status === 'In Stock' ? parseInt(quantity, 10) : 0,
    };
  
    try {
      await axios.put(`${baseURL}/inventories/${inventoryId}`, updatedItem);
      setAlert({ message: 'Item updated successfully 😎', type: 'success' });
      setTimeout(() => {
        navigate(`/inventory/${inventoryId}`); // Navigate to the edited inventory item's details after 3 seconds
      }, 3000);
    } catch (error) {
      console.error('Error updating item:', error);
      setAlert({ message: 'Failed to update item 😔', type: 'error' });
    }
  };  

  // Function to handle cancel action
  const handleCancel = (event) => {
    event.preventDefault();
    setItemName(dataCopy.item_name);
    setDescription(dataCopy.description);
    setCategory(dataCopy.category);
    setQuantity(dataCopy.quantity);
    setWarehouse(dataCopy.warehouse_name);
    setStatus(dataCopy.status);
    setErrors({});
    setAlert({ message: 'Here are your OG details 🧐', type: 'info' });

    // Clears alert after 4 seconds
    setTimeout(() => {
      setAlert({ message: '', type: '' });
    }, 4000);
  };  

  // Function to handle back button click
  const handleBackClick = () => {
    navigate(-1); 
  };

  return (
    <div className='inventory-edit box-shadow'>
      <div className='inventory-edit-header inventory-edit-header__list-padding-side'>
        <img src={ArrowBack} className='inventory-edit__back-btn' alt='back' onClick={handleBackClick} />
        <h1 className='inventory-edit-header__title txt-header txt-black'>
          Edit Inventory Item
        </h1>
      </div>
      {alert.message && <Alert message={alert.message} type={alert.type} />}
      <div className='divider'></div>
      <form onSubmit={handleSubmit}>
        <div className='inventory-edit-form__container '>
          <div className='inventory-edit-form__one inventory-edit-form list-padding-side'>
            <h2 className='inventory-edit-title'>Item Details</h2>

            <label className='inventory-edit-label'>
              <span className='inventory-edit-label-txt txt-label txt-bold txt-black'>Item Name</span>
              <input
                className={`inventory-edit-input input txt-m txt-black ${errors.itemName ? 'input-error' : ''}`}
                type='text'
                onChange={handleInputChange(setItemName, 'itemName')}
                value={itemName}
                placeholder='Item Name'
              />
              {errors.itemName && <span className='error txt-label'><img src={errorIcon} alt='Error Alert' />{errors.itemName}</span>}
            </label>

            <label className='inventory-edit-label'>
              <span className='inventory-edit-label-txt txt-label txt-bold txt-black'>Description</span>
              <textarea
                className={`inventory-edit-textarea input txt-m txt-black ${errors.description ? 'input-error' : ''}`}
                onChange={handleInputChange(setDescription, 'description')}
                value={description}
                placeholder='Please enter a brief item description...'></textarea>
              {errors.description && <span className='error txt-label'><img src={errorIcon} alt='Error Alert' />{errors.description}</span>}
            </label>

            <label className='inventory-edit-label'>
              <span className='inventory-edit-label-txt txt-label txt-bold txt-black'>Category</span>
              <select
                className={`inventory-edit-select inventory-edit-input custom-select-arrow input txt-m txt-black ${errors.category ? 'input-error' : ''}`}
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
              {errors.category && <span className='error txt-label'><img src={errorIcon} alt='Error Alert' />{errors.category}</span>}
            </label>
          </div>
          <div className='divider hide--tablet'></div>

          <div className='inventory-edit-form__two inventory-edit-form list-padding-side'>
            <h2 className='inventory-edit-title'>Item Availability</h2>

            <div className='status-inventory-edit__title inventory-edit-label'>
              <span className='inventory-edit-label-txt txt-label txt-bold txt-black'>Status</span>
              <label
                className={`inventory-oval-container ${errors.status ? 'input-error' : ''} ${status === 'In Stock' ? 'selected' : ''}`}>
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
                className={`inventory-oval-container ${errors.status ? 'input-error' : ''} ${status === 'Out of Stock' ? 'selected' : ''}`}>
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
                <span className='inventory-edit-label-txt txt-label txt-bold txt-black'>Quantity</span>
                <input
                  className={`inventory-edit-input inventory-edit-input--qty input txt-m txt-black ${errors.quantity ? 'input-error' : ''}`}
                  type='number'
                  onChange={handleInputChange(setQuantity, 'quantity')}
                  value={quantity}
                  placeholder='0'
                />
                {errors.quantity && <span className='error txt-label'><img src={errorIcon} alt='Error Alert' />{errors.quantity}</span>}
              </label>
            )}

            <label className='inventory-edit-label'>
              <span className='inventory-edit-label-txt txt-label txt-bold txt-black'>Warehouse</span>
              <select
                className={`inventory-edit-select inventory-edit-input custom-select-arrow input txt-m txt-black ${errors.warehouse ? 'input-error' : ''}`}
                onChange={handleInputChange(setWarehouse, 'warehouse')}
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
              {errors.warehouse && <span className='error txt-label'><img src={errorIcon} alt='Error Alert' />{errors.warehouse}</span>}
            </label>
          </div>
        </div>
        <div className='inventory-edit-button__container list-padding-side'>
          <button
            className='inventory-edit-button inventory-edit-button--cancel btn txt-label txt-bold'
            type='button'
            aria-label='Cancel Changes'
            onClick={handleCancel}>
            Cancel
          </button>
          <button
            type='submit'
            aria-label='Submit'
            className='inventory-edit-button inventory-edit-button--save btn txt-label txt-bold'>
            Save
          </button>
        </div>
      </form>
    </div>
  );
}

export default EditInventory;