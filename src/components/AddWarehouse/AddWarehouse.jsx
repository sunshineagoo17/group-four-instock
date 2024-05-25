import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Alert from '../Alert/Alert';
import './AddWarehouse.scss';
import backIcon from '../../assets/images/arrow_back-24px.svg';
import errorIcon from '../../assets/images/error-24px.svg'; 

const AddWarehouse = ({ baseURL }) => {
  const navigate = useNavigate();

  // State to store form data
  const [formData, setFormData] = useState({
    warehouse_name: '',
    address: '',
    city: '',
    country: '',
    contact_name: '',
    contact_position: '',
    contact_phone: '',
    contact_email: '',
  });

  const [errors, setErrors] = useState({});
  const [alert, setAlert] = useState({ message: '', type: '' });

  // Regex functions for validation
  const phoneRegex = /^(\+?\d{1,4})?[\s-]?(\(?\d{3}\)?)[\s-]?\d{3}[\s-]?\d{4}$/;
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const nameRegex = /^[a-zA-Z.\s-]*$/;

  // Handle input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name === 'contact_phone') {
      // Validate phone number input
      const cleanedValue = value.replace(/[^\d\s-()+]/g, '');
      setFormData((prevDetails) => ({
        ...prevDetails,
        [name]: cleanedValue,
      }));
      setErrors((prevErrors) => ({ ...prevErrors, contact_phone: '' }));
    } else if (name === 'contact_name') {
      // Validate contact name input
      if (nameRegex.test(value)) {
        setFormData((prevDetails) => ({
          ...prevDetails,
          [name]: value,
        }));
        setErrors((prevErrors) => ({ ...prevErrors, contact_name: '' }));
      }
    } else {
      setFormData((prevDetails) => ({
        ...prevDetails,
        [name]: value,
      }));
      if (name === 'contact_email') setErrors((prevErrors) => ({ ...prevErrors, contact_email: '' }));
      if (name !== 'contact_phone' && name !== 'contact_email') {
        setErrors((prevErrors) => ({ ...prevErrors, [name]: '' }));
      }
    }

    setAlert({ message: '', type: '' }); // Clear alert when user starts typing
  };

  // Formats the phone number to a standard format
  const formatPhoneNumber = (number) => {
    const cleaned = ('' + number).replace(/\D/g, '');
    if (cleaned.length < 11) {
      return number;
    }
    const match = cleaned.match(/^(\d{1})(\d{3})(\d{3})(\d{4})$/);
    if (match) {
      return `+${match[1]} (${match[2]}) ${match[3]}-${match[4]}`;
    }
    return number;
  };

  // Function used upon submission of form
  const formSubmit = (event) => {
    event.preventDefault();
    setAlert({ message: '', type: '' });

    const {
      warehouse_name,
      address,
      city,
      country,
      contact_name,
      contact_position,
      contact_phone,
      contact_email,
    } = formData;

    // Reset error states
    setErrors({});

    // Form validation
    let hasError = false;
    const newErrors = {};
    if (!warehouse_name) newErrors.warehouse_name = 'Warehouse name is required';
    if (!address) newErrors.address = 'Address is required';
    if (!city) newErrors.city = 'City is required';
    if (!country) newErrors.country = 'Country is required';
    if (!contact_name) newErrors.contact_name = 'Contact name is required and must only contain letters, ".", and "-"';
    if (!contact_position) newErrors.contact_position = 'Contact position is required';
    if (!phoneRegex.test(contact_phone) || formData.contact_phone.replace(/\D/g, '').length < 11) newErrors.contact_phone = 'The phone number entered is incorrect';
    if (!emailRegex.test(contact_email)) newErrors.contact_email = 'The email you entered is incorrect';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setAlert({ message: 'Please correct the errors in the form. 💁‍♂️', type: 'error' });
      hasError = true;
    }

    if (!hasError) {
      const formattedPhone = formatPhoneNumber(contact_phone);
      const newWarehouse = {
        ...formData,
        contact_phone: formattedPhone,
      };
      axios
        .post(`${baseURL}/warehouses`, newWarehouse)
        .then((response) => {
          const newWarehouseId = response.data.id; // Get the new warehouse ID
          setAlert({ message: 'Warehouse added successfully. 🎉🥂', type: 'success' });
          setFormData({
            warehouse_name: '',
            address: '',
            city: '',
            country: '',
            contact_name: '',
            contact_position: '',
            contact_phone: '',
            contact_email: '',
          });
          setTimeout(() => navigate(`/warehouse/${newWarehouseId}`), 3000); // Navigate to the new warehouse's detail page
        })
        .catch((error) => {
          console.log(error);
          setAlert({ message: 'Failed to add warehouse. 🤦', type: 'error' });
        });
    }
  };

  return (
    <div className='warehouseForm box-shadow'>
      <div className='warehouseForm__header'>
        <div className='warehouseForm__header_title txt-header txt-bold txt-black'>
          <img
            className='warehouseForm__back-btn'
            src={backIcon}
            alt='go back to list of warehouses'
            onClick={() => navigate('/warehouse')}
          />
          Add New Warehouse
        </div>
      </div>
      <div className='divider'></div>
      {alert.message && <Alert message={alert.message} type={alert.type} />}
      <div className='formWrapper'>
        <div className='form-padding-side form-padding-topbottom'>
          <form
            className='editForm'
            id='addWarehouseForm'
            onSubmit={formSubmit}>
            <div className='editForm__warehouse form-padding-side'>
              <div className='txt-subheader txt-bold txt-black subheader_spacing'>
                Warehouse Details
              </div>
              <div className='editForm__inputLabelWrapper'>
                <label
                  className='editForm__inputLabel txt-label'
                  htmlFor='warehouse_name'>
                  Warehouse Name
                </label>
                <input
                  className={`editForm__input ${errors.warehouse_name ? 'editForm__invalid-input' : ''}`}
                  name='warehouse_name'
                  type='text'
                  placeholder='Warehouse Name'
                  value={formData.warehouse_name}
                  onChange={handleInputChange}
                />
                {errors.warehouse_name && <span className='error txt-label'><img src={errorIcon} alt='Error Alert' />{errors.warehouse_name}</span>}
              </div>
              <div className='editForm__inputLabelWrapper'>
                <label
                  className='editForm__inputLabel txt-label'
                  htmlFor='address'>
                  Street Address
                </label>
                <input
                  className={`editForm__input ${errors.address ? 'editForm__invalid-input' : ''}`}
                  name='address'
                  type='text'
                  placeholder='Street Address'
                  value={formData.address}
                  onChange={handleInputChange}
                />
                {errors.address && <span className='error txt-label'><img src={errorIcon} alt='Error Alert' />{errors.address}</span>}
              </div>
              <div className='editForm__inputLabelWrapper'>
                <label
                  className='editForm__inputLabel txt-label'
                  htmlFor='city'>
                  City
                </label>
                <input
                  className={`editForm__input ${errors.city ? 'editForm__invalid-input' : ''}`}
                  name='city'
                  type='text'
                  placeholder='City'
                  value={formData.city}
                  onChange={handleInputChange}
                />
                {errors.city && <span className='error txt-label'><img src={errorIcon} alt='Error Alert' />{errors.city}</span>}
              </div>
              <div className='editForm__inputLabelWrapper'>
                <label
                  className='editForm__inputLabel txt-label'
                  htmlFor='country'>
                  Country
                </label>
                <input
                  className={`editForm__input ${errors.country ? 'editForm__invalid-input' : ''}`}
                  name='country'
                  type='text'
                  placeholder='Country'
                  value={formData.country}
                  onChange={handleInputChange}
                />
                {errors.country && <span className='error txt-label'><img src={errorIcon} alt='Error Alert' />{errors.country}</span>}
              </div>
            </div>
            <div className='form-padding-topbottom--contact form-padding-side'>
              <div className='txt-subheader txt-bold txt-black subheader_spacing'>
                Contact Details
              </div>
              <div className='editForm__inputLabelWrapper'>
                <label
                  className='editForm__inputLabel txt-label'
                  htmlFor='contact_name'>
                  Contact Name
                </label>
                <input
                  className={`editForm__input ${errors.contact_name ? 'editForm__invalid-input' : ''}`}
                  name='contact_name'
                  type='text'
                  placeholder='Contact Name'
                  value={formData.contact_name}
                  onChange={handleInputChange}
                />
                {errors.contact_name && <span className='error txt-label'><img src={errorIcon} alt='Error Alert' />{errors.contact_name}</span>}
              </div>
              <div className='editForm__inputLabelWrapper'>
                <label
                  className='editForm__inputLabel txt-label'
                  htmlFor='contact_position'>
                  Position
                </label>
                <input
                  className={`editForm__input ${errors.contact_position ? 'editForm__invalid-input' : ''}`}
                  name='contact_position'
                  type='text'
                  placeholder='Position'
                  value={formData.contact_position}
                  onChange={handleInputChange}
                />
                {errors.contact_position && <span className='error txt-label'><img src={errorIcon} alt='Error Alert' />{errors.contact_position}</span>}
              </div>
              <div className='editForm__inputLabelWrapper'>
                <label
                  className='editForm__inputLabel txt-label'
                  htmlFor='contact_phone'>
                  Phone Number
                </label>
                <input
                  className={`editForm__input ${errors.contact_phone ? 'editForm__invalid-input' : ''}`}
                  name='contact_phone'
                  type='tel'
                  placeholder='Phone Number'
                  value={formData.contact_phone}
                  onChange={handleInputChange}
                />
                {errors.contact_phone && <span className='error txt-label'><img src={errorIcon} alt='Error Alert' />{errors.contact_phone}</span>}
              </div>
              <div className='editForm__inputLabelWrapper'>
                <label
                  className='editForm__inputLabel txt-label'
                  htmlFor='contact_email'>
                  Email
                </label>
                <input
                  className={`editForm__input ${errors.contact_email ? 'editForm__invalid-input' : ''}`}
                  name='contact_email'
                  type='email'
                  placeholder='Email'
                  value={formData.contact_email}
                  onChange={handleInputChange}
                />
                {errors.contact_email && <span className='error txt-label'><img src={errorIcon} alt='Error Alert' />{errors.contact_email}</span>}
              </div>
            </div>
          </form>
        </div>
      </div>
      <div className='editForm__buttonContainer'>
        <button
          className='warehouseForm__btn warehouseForm__btn--cancel txt-bold'
          aria-label='Cancel'
          onClick={() => navigate('/warehouse')}>
          Cancel
        </button>
        <button
          className='warehouseForm__btn warehouseForm__btn--save txt-bold'
          type='submit'
          aria-label='Submit'
          form='addWarehouseForm'>
          <span className="short-text">+ Add</span>
          <span className="full-text">+ Add Warehouse</span>
        </button>
      </div>
    </div>
  );
};

export default AddWarehouse;