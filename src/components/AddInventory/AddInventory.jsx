import React from 'react'
import './AddInventory.scss';

function AddInventory() {
  return (
    <div className='inventory-add'>
        <div className='inventory-add-header list-padding-side'>
        <h1 className='inventory-add-header__title txt-header txt-black'>Add New Inventory Item</h1>
        </div>
        <div className='forms-containers'>
        <form className='inventory-add-form__one inventory-add-form' action="">
        <h2 className='inventory-add-title'>Item Details</h2>
            <label className='inventory-add-label'>Item Name</label><br />
            <input className='inventory-add-input' type="text" placeholder='Item Name' /><br />
            <label className='inventory-add-label' >Description</label><br />
            <textarea className='inventory-add-textarea' placeholder='Please enter a brief item description...'></textarea><br />
            <label className='inventory-add-label'>Category</label><br />
            <input className='inventory-add-input' type="text" placeholder='Please select' />
        </form>
        

        <form className='inventory-add-form__two inventory-add-form' action="">
            <h2 className='inventory-add-title'>Item Availability</h2>
            <div>Status</div>
            <div className='oval'></div>
            <div>In stock</div>
            <div className='oval'></div>
            <div>Out of stock</div>

        <label className='inventory-add-label'>Quantity</label><br />
        <input className='inventory-add-input' placeholder='0'></input><br />

        <label className='inventory-add-label'>Wharehouse</label><br />
        <input className='inventory-add-input' placeholder='Please select'></input>


        </form>
        </div>
    </div>
  )
}

export default AddInventory