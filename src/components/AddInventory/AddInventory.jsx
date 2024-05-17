import React from 'react'
import './AddInventory.scss';
import arrowDrop from '../../assets/images/arrow_drop_down-24px.svg';
import ArrowBack from '../../assets/images/arrow_back-24px.svg';

function AddInventory() {
  return (
    <div className='inventory-add'>
           <div className='inventory-add-header list-padding-side'>
            <img src={ArrowBack}></img>
              <h1 className='inventory-add-header__title txt-header txt-black'>Add New Inventory Item</h1>
           </div>
        <div className='inventory-add-form__container'>
           <form className='inventory-add-form__one inventory-add-form' action="">
               <h2 className='inventory-add-title'>Item Details</h2>
               <label className='inventory-add-label'>Item Name</label><br />
               <input className='inventory-add-input' type="text" placeholder='   Item Name' /><br />
               <label className='inventory-add-label' >Description</label><br />
               <textarea className='inventory-add-textarea' placeholder='   Please enter a brief item description...'></textarea><br />
               <label className='inventory-add-label'>Category</label><br />
               <div className='inventory-add-icon__container'>
                <img src={arrowDrop}></img>
               <input className='inventory-add-input' type="text" placeholder='   Please select' />
               </div>
           </form>
        

            <form className='inventory-add-form__two inventory-add-form' action="">
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
                <input className='inventory-add-input' placeholder='0'></input><br />
                <label className='inventory-add-label'>Wharehouse</label><br />
                <div className='inventory-add-icon__container'>
                <img src={arrowDrop}></img>
                <input className='inventory-add-input' placeholder='Please select'></input>
                </div>
          </form>
          </div>
        <div className='inventory-add-button__container'>
            <button className='inventory-add-button inventory-add-button__one'>Cancel</button>
            <button className='inventory-add-button inventory-add-button__two'>+Add Item</button>
            
        </div>
        
    </div>
  )
}

export default AddInventory