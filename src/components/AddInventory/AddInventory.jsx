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
        axios.get(`${baseURL}/categories`)
            .then((response) => {
                setCategories(response.data);
            })
            .catch((error) => {
                console.error('Error fetching categories:', error);
            });
        
        axios.get(`${baseURL}/warehouses`)
            .then((response) => {
                setWarehouses(response.data);
            })
            .catch((error) => {
                console.error('Error fetching warehouses:', error);
            });
    }, [baseURL]);

    const handleItemName = (event) => setItemName(event.target.value);
    const handleDescription = (event) => setDescription(event.target.value);
    const handleCategory = (event) => setCategory(event.target.value);
    const handleQuantity = (event) => setQuantity(event.target.value);
    const handleWarehouse = (event) => setWarehouse(event.target.value);
    const handleStatusChange = (status) => setStatus(status);

    const validateFields = () => {
        const errors = {};
        if (!itemName) errors.itemName = 'Item name is required';
        if (!description) errors.description = 'Description is required';
        if (!category) errors.category = 'Category is required';
        if (!warehouse) errors.warehouse = 'Warehouse is required';
        if (status === 'In Stock' && !quantity) errors.quantity = 'Quantity is required';

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
            quantity: status === 'In Stock' ? quantity : 0
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
                <h1 className='inventory-add-header__title txt-header txt-black'>Add New Inventory Item</h1>
            </div>
            <form onSubmit={handleSubmit}>
                <div className='inventory-add-form__container'>
                    <div className='inventory-add-form__one inventory-add-form'>
                        <h2 className='inventory-add-title'>Item Details</h2>
                        
                        <label className='inventory-add-label'>Item Name</label><br />
                        {errors.itemName && <span className='error'>{errors.itemName}</span>}<br></br>
                        <input
                            className='inventory-add-input'
                            type='text'
                            onChange={handleItemName}
                            value={itemName}
                            placeholder='   Item Name'
                        />
                       
                        <br />
                        
                        <label className='inventory-add-label'>Description</label><br />
                        {errors.description && <span className='error'>{errors.description}</span>}<br/>
                        <textarea
                            className='inventory-add-textarea'
                            onChange={handleDescription}
                            value={description}
                            placeholder='   Please enter a brief item description...'
                        ></textarea>
                        
                        <br />
                    
                        <label className='inventory-add-label'>Category</label><br />
                        {errors.category && <span className='error'>{errors.category}</span>}<br/>
                            
                            <select
                                className='inventory-add-select inventory-add-input'
                                onChange={handleCategory}
                                value={category}
                            >
                                <option value="" disabled>Please select</option>
                                {categories.map((cat) => (
                                    <option key={cat.id} value={cat.name}>{cat.name}</option>
                                ))}
                            </select>
                                    
                    </div>

                    <div className='inventory-add-form__two inventory-add-form'>
                        <h2 className='inventory-add-title'>Item Availability</h2>
                        <div>Status</div>
                        <div className='status-inventory-add'>
                            <div
                                className={`inventory-oval-container ${status === 'In Stock' ? 'selected' : ''}`}
                                onClick={() => handleStatusChange('In Stock')}
                            >
                                <div className={'oval'}></div>
                                <div className='inventory-add-status'>In stock</div>
                            </div>
                            <div
                                className={`inventory-oval-container ${status === 'Out of Stock' ? 'selected' : ''}`}
                                onClick={() => handleStatusChange('Out of Stock')}
                            >
                                <div className='oval'></div>
                                <div className='inventory-add-status'>Out of stock</div>
                            </div>
                        </div>
                        {status === 'In Stock' && (
                            <>
                                <label className='inventory-add-label'>Quantity</label><br />
                                {errors.quantity && <span className='error'>{errors.quantity}</span>}<br />
                                <input
                                    className='inventory-add-input'
                                    type='number'
                                    onChange={handleQuantity}
                                    value={quantity}
                                    placeholder='0'
                                />
                                
                                <br />
                            </>
                        )}
                        <label className='inventory-add-label'>Warehouse</label><br />
                        {errors.warehouse && <span className='error'>{errors.warehouse}</span>}<br/>
                        
                            <select
                                className='inventory-add-select inventory-add-input'
                                onChange={handleWarehouse}
                                value={warehouse}
                            >
                                <option value="" disabled>Please select</option>
                                {warehouses.map((wh) => (
                                    <option key={wh.id} value={wh.id}>{wh.warehouse_name}</option>
                                ))}
                            </select>
                                              
                    </div>
                </div>
                <div className='inventory-add-button__container'>
                    <button className='inventory-add-button inventory-add-button__one' type='button' onClick={handleCancel}>Cancel</button>
                    <button type='submit' className='inventory-add-button inventory-add-button__two'>+ Add Item</button>
                </div>
            </form>
        </div>
    );
}

export default AddInventory;
