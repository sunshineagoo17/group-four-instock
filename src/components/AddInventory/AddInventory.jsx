import React, { useState } from 'react'
import './AddInventory.scss';
import arrowDrop from '../../assets/images/arrow_drop_down-24px.svg';
import ArrowBack from '../../assets/images/arrow_back-24px.svg';
import { Link } from 'react-router-dom';


function AddInventory() {

    //Form Validation//
    const [itemName, setItemName]= useState('');
    const [description, setDescription]= useState('');
    const [category, setCategory] = useState('');
    const [quantity, setQuantity] = useState('');
    const [warehouse, setWarehouse] = useState('');

    const handleItemName = (event) =>{
       setItemName(event.target.value);
    }
    const handleDescription = (event) =>{
        setDescription(event.target.value)
    }
    const handleCategory = (event) =>{
        setCategory(event.target.value)
    }
    const handleQuantity = (event) =>{
        setQuantity(event.target.value)
    }
    const handleWarehouse = (event) =>{
        setWarehouse(event.target.value)
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        
        if (!itemName || !description || !category || !quantity || !warehouse) {
            alert('All fields must be filled 😑');
        } else {
            alert('Items added successfully 😎');
            // axios request to database.
        }
    };

      const handleCancel = (event) => {
        event.preventDefault();
        setItemName('');
        setDescription('');
        setCategory('');
        setQuantity('');
        setWarehouse('');
    };





  return (
    <div className='inventory-add'>
           <div className='inventory-add-header list-padding-side'>
           <Link to='/inventory'><img src={ArrowBack} alt='back'></img> </Link> 
              <h1 className='inventory-add-header__title txt-header txt-black'>Add New Inventory Item</h1>
           </div>
           <form onSubmit={handleSubmit} >

        <div  className='inventory-add-form__container'>
            

           <div  className='inventory-add-form__one inventory-add-form'>
               <h2 className='inventory-add-title'>Item Details</h2>

               <label className='inventory-add-label'>Item Name</label><br />
               <input className='inventory-add-input' type="text" onChange={handleItemName}   value={itemName} placeholder='   Item Name' /><br />

               <label className='inventory-add-label' >Description</label><br />
               <textarea className='inventory-add-textarea' onChange={handleDescription} value={description}  placeholder='   Please enter a brief item description...'></textarea><br />

               <label className='inventory-add-label'>Category</label><br />
               <div className='inventory-add-icon__container'>
                <img src={arrowDrop} alt='arrow-drop'></img>
               <input className='inventory-add-input' type="text" onChange={handleCategory} value={category}  placeholder='   Please select' />
               </div>
           </div>
        
            <div className='inventory-add-form__two inventory-add-form'>
                <h2 className='inventory-add-title'>Item Availability</h2>
                <div>Status</div>
                <div className='status-inventory-add'>
                   <div className='inventory-oval-container'>
                     <div className='oval'></div>
                     <div className='inventory-add-status'>In stock</div>
                  </div>
                   <div className='inventory-oval-container'>
                       <div className='oval'></div>
                        <div className='inventory-add-status'>Out of stock</div>
                   </div>
                </div>
            
                <label className='inventory-add-label'>Quantity</label><br />
                <input className='inventory-add-input' type='number' onChange={handleQuantity} value={quantity} placeholder='0'></input><br />

                <label className='inventory-add-label'>Wharehouse</label><br />
                <div className='inventory-add-icon__container'>
                <img  alt='arrow-drop' src={arrowDrop}/>
                <input className='inventory-add-input'onChange={handleWarehouse} value={warehouse} placeholder='Please select'></input>
                </div>
          </div>
          </div>
          <div className='inventory-add-button__container'>
            <button className='inventory-add-button inventory-add-button__one' type='button' onClick={handleCancel} >Cancel</button>
            <button type='submit' className='inventory-add-button inventory-add-button__two' >+Add Item</button>
            
        </div>
        </form>
        
         
        
    </div>
  )
}

export default AddInventory