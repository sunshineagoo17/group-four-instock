import './EditWarehouse.scss';
import backIcon from '../../assets/images/arrow_back-24px.svg';
import { useState } from 'react';
import axios from 'axios';


//Things to do 
    // Clear all inputs when you click cancel 
    // style the validation 
    //params from warehouse list
    //Actuall test put function

const EditWarehouse = () => {

    const [emailError, setEmailError] = useState('');
    const [phoneError, setPhoneError] = useState('');
    const [emptyError, setEmptyError] = useState('');
   
    //Regex functions for validation 
    const phoneRegex = /^\+?(\d{1,4})?[\s-]?(\(?\d{3}\)?)[\s-]?(\d{3})[\s-]?(\d{4})$/;
    const emailRegex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
    const emptyRegex = /^$/;

  
    //Function used upon submittion of form
    const formSubmit = (event)=>{
        event.preventDefault();
        console.log(event);
        const warehouse__nameInput = [event.target[0].value];
        const addressInput = [event.target[1].value];
        const cityInput = [event.target[2].value];
        const countryInput = [event.target[3].value];
        const nameInput = [event.target[4].value];
        const positionInput = [event.target[5].value];
        const phoneInput = event.target[6].value
        const emailInput = event.target[7].value
        
        const eventArray = [warehouse__nameInput,addressInput,cityInput,countryInput,nameInput,positionInput,phoneInput,emailInput]

        //Returns an array with non empty values
        const eventArrayLoop = eventArray.filter((input)=>{
            return input;
        });

        //Warehouse details from the form that will be used for the put request
        const warehouseDetails = {
            warehouse_name: warehouse__nameInput,
            address: addressInput, 
            city: cityInput,
            country: countryInput,
            contact_name: nameInput,
            contact_position: positionInput,
            contact_phone: phoneInput,
            contact_email: emailInput
        }

        if(eventArrayLoop.length <8){
            setEmptyError('One or more fields are empty')
        }else if(!phoneRegex.test(phoneInput) && !emptyRegex.test(phoneInput) ){
            setPhoneError('The phone number entered is incorrect')
        }else if(!emailRegex.test(emailInput) && !emptyRegex.test(phoneInput)){
            setEmailError('The email you entered is incorrect')
        }else{
            axios.put('https://26abfd85-a3b8-40df-a5ee-048db9cfdaf3.mock.pstmn.io',warehouseDetails).then((data)=>{
                console.log(data);
            }).catch((error)=>{
                console.log(error);
            });
        }
    }

  return(
    <div className='warehouseForm'>
        <div className='warehouseForm__header list-padding-side'>
        <div className='warehouseForm__header_title txt-header txt-bold txt-black'>
          
            <img src={backIcon} alt='go back to inventory' />
        Edit Warehouse
        </div>
      </div>
        <div className='divider'></div>
        <div className='formWrapper'>
            <div className='form-padding-side form-padding-topbottom'>
                
                    <form className='editForm'id='editWarehouseInfo'onSubmit={formSubmit}>
                        <div className='editForm__warehouse form-padding-side'>
                            <div className='txt-subheader txt-bold txt-black subheader_spacing'>Warehouse Details</div>
                                <div className='editForm__inputLabelWrapper'>
                                    <label className='editForm__inputLabel txt-label'htmlFor='warehouse__name'>Warehouse Name</label>
                                    <input className='editForm__input'name='warehouse__name'type='text'></input>
                                </div>
                                <div className='editForm__inputLabelWrapper'>
                                    <label className='editForm__inputLabel txt-label'htmlFor='street__address'>Street Address</label>
                                    <input className='editForm__input'name='street__address'type='text'></input>
                                </div>
                                <div className='editForm__inputLabelWrapper'>
                                    <label className='editForm__inputLabel txt-label'htmlFor='city'>City</label>
                                    <input className='editForm__input'name='city'type='text'></input>
                                </div>
                                <div className='editForm__inputLabelWrapper'>
                                    <label className='editForm__inputLabel txt-label'htmlFor='country'>Country</label>
                                    <input className='editForm__input'name='country'type='text'></input>
                                </div>
                        </div>
                       
                        <div className='form-padding-topbottom--contact form-padding-side'>
                            <div className='txt-subheader txt-bold txt-black subheader_spacing'>Contact Details</div>
                            <div className='editForm__inputLabelWrapper'>
                                    <label className='editForm__inputLabel txt-label'htmlFor='contact__name'>Contact Name</label>
                                    <input className='editForm__input'name='contact__name'type='text'></input>
                            </div>
                            <div className='editForm__inputLabelWrapper'>
                                <label className='editForm__inputLabel txt-label'htmlFor='position'>Position</label>
                                <input className='editForm__input'name='position'type='text'></input>
                            </div>
                            <div className='editForm__inputLabelWrapper'>
                                <label className='editForm__inputLabel txt-label'htmlFor='phone__number'>Phone Number</label>
                                <input className='editForm__input'name='phone__number'type='tel'></input>
                            </div>
                            <div className='editForm__inputLabelWrapper'>
                                <label className='editForm__inputLabel txt-label'htmlFor='email'>Email</label>
                                <input className='editForm__input'name='email'type='email'></input>
                            </div>
                        </div>
                </form>
            </div>
        </div> 
    <div className='editForm__buttonContainer'>
        <button className='btn btn--cancel'>Cancel</button>
        <button className='btn btn--save'type='submit'form='editWarehouseInfo'>Save</button>
    </div>
    {emailError || phoneError || emptyError ? 
    <>
        <div className='error'>
            <>
                <p className='error__text'>{emailError}</p>
                <p className='error__text'>{phoneError}</p>
                <p className='error__text'>{emptyError}</p>
            </>
        </div>
    </>
    : 
    <></>  
    }
</div>
  );
};

export default EditWarehouse;
