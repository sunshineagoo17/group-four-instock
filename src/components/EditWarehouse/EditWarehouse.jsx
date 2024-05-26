import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Alert from '../Alert/Alert';
import './EditWarehouse.scss';
import errorIcon from '../../assets/images/error-24px.svg';
import backIcon from '../../assets/images/arrow_back-24px.svg';

const EditWarehouse = ({ baseURL }) => {
  const { id } = useParams();
  const navigate = useNavigate();

  // State to store warehouse details
  const [warehouseDetails, setWarehouseDetails] = useState({
    warehouse_name: '',
    address: '',
    city: '',
    country: '',
    contact_name: '',
    contact_position: '',
    contact_phone: '',
    contact_email: '',
  });

  // State to store original warehouse details
  const [originalDetails, setOriginalDetails] = useState({
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

  const phoneRegex = /^(\+?\d{1,4})?[\s-]?(\(?\d{3}\)?)[\s-]?\d{3}[\s-]?\d{4}$/;
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const nameRegex = /^[a-zA-Z.\s-]*$/; // Regex for contact name validation

  useEffect(() => {
    const fetchWarehouseDetails = async () => {
      try {
        const response = await axios.get(`${baseURL}/warehouses/${id}`);
        setWarehouseDetails(response.data);
        setOriginalDetails(response.data); // Store the original details
      } catch (error) {
        console.error('Error fetching warehouse details:', error);
      }
    };
    fetchWarehouseDetails();
  }, [id, baseURL]);

  const formatPhoneNumber = (number) => {
    // Formats the phone number to a standard format
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

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name === 'contact_phone') {
      // Validates and cleans phone number input
      const cleanedValue = value.replace(/[^\d\s-()+]/g, '');
      setWarehouseDetails((prevDetails) => ({
        ...prevDetails,
        [name]: cleanedValue,
      }));
      setErrors((prevErrors) => ({ ...prevErrors, contact_phone: '' }));
    } else if (name === 'contact_name') {
      // Validates the contact name input
      if (nameRegex.test(value)) {
        setWarehouseDetails((prevDetails) => ({
          ...prevDetails,
          [name]: value,
        }));
        setErrors((prevErrors) => ({ ...prevErrors, contact_name: '' }));
      }
    } else {
      setWarehouseDetails((prevDetails) => ({
        ...prevDetails,
        [name]: value,
      }));
      if (name === 'contact_email')
        setErrors((prevErrors) => ({ ...prevErrors, contact_email: '' }));
      if (name !== 'contact_phone' && name !== 'contact_email') {
        setErrors((prevErrors) => ({ ...prevErrors, [name]: '' }));
      }
    }

    setAlert({ message: '', type: '' }); // Clears alert when user starts typing
  };

  const formCancellation = () => {
    // Resets form to original details
    setWarehouseDetails(originalDetails);
    setErrors({}); // Clears all error messages
    setAlert({ message: 'Here are your OG details 🧐', type: 'info' });

    // Clears alert after 4 seconds
    setTimeout(() => {
      setAlert({ message: '', type: '' });
    }, 4000);
  };

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
    } = warehouseDetails;

    setErrors({});

    let hasError = false;
    const newErrors = {};
    if (!warehouse_name)
      newErrors.warehouse_name = 'Warehouse name is required';
    if (!address) newErrors.address = 'Address is required';
    if (!city) newErrors.city = 'City is required';
    if (!country) newErrors.country = 'Country is required';
    if (!contact_name)
      newErrors.contact_name =
        'Contact name is required and must only contain letters, ".", and "-"';
    if (!contact_position)
      newErrors.contact_position = 'Contact position is required';
    if (
      !phoneRegex.test(contact_phone) ||
      warehouseDetails.contact_phone.replace(/\D/g, '').length < 11
    )
      newErrors.contact_phone = 'The phone number entered is incorrect';
    if (!emailRegex.test(contact_email))
      newErrors.contact_email = 'The email you entered is incorrect';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setAlert({
        message: 'Please correct the errors in the form. 💁‍♂️',
        type: 'error',
      });
      hasError = true;
    }

    if (!hasError) {
      const formattedPhone = formatPhoneNumber(contact_phone);
      const updatedDetails = {
        ...warehouseDetails,
        contact_phone: formattedPhone,
      };
      axios
        .put(`${baseURL}/warehouses/${id}`, updatedDetails)
        .then((data) => {
          console.log(data);
          setAlert({
            message: 'Warehouse updated successfully. 🎉🥂',
            type: 'success',
          });
          setTimeout(() => {
            if (!alert.message) {
              navigate(`/warehouse/${id}`); // Navigates to the updated warehouse details page after 3 seconds
            }
          }, 3000);
        })
        .catch((error) => {
          console.log(error);
          setAlert({
            message: 'Failed to update warehouse. 🤦',
            type: 'error',
          });
        });
    }
  };

  // Navigates to the previous page
  const handleBackClick = () => {
    navigate(-1);
  };

  return (
    <div className='editWarehouseForm box-shadow'>
      <div className='editWarehouseForm__header'>
        <div className='editWarehouseForm__header_title txt-header txt-bold txt-black'>
          <img
            className='editWarehouseForm__back-btn'
            src={backIcon}
            alt='go back to the previous page'
            onClick={handleBackClick}
          />
          Edit {warehouseDetails.warehouse_name}
        </div>
      </div>
      {alert.message && <Alert message={alert.message} type={alert.type} />}
      <div className='editWarehouseForm__divider'></div>
      <div className='formWrapper'>
        <form className='editForm' id='editWarehouseForm' onSubmit={formSubmit}>
          <div className='formWrapper__warehouse-details editForm__warehouse'>
            <div className='form-padding-side'>
              <div className='txt-subheader txt-bold txt-black subheader_spacing'>
                Warehouse Details
              </div>
              <div className='editForm__inputLabelWrapper'>
                <label
                  className='editForm__inputLabel txt-label txt-bold'
                  htmlFor='warehouse_name'>
                  Warehouse Name
                </label>
                <input
                  className={`editForm__input ${
                    errors.warehouse_name ? 'editForm__invalid-input' : ''
                  }`}
                  name='warehouse_name'
                  type='text'
                  placeholder='Warehouse Name'
                  value={warehouseDetails.warehouse_name}
                  onChange={handleInputChange}
                />
                {errors.warehouse_name && (
                  <span className='error txt-label'>
                    <img src={errorIcon} alt='Error Alert' />
                    {errors.warehouse_name}
                  </span>
                )}
              </div>
              <div className='editForm__inputLabelWrapper'>
                <label
                  className='editForm__inputLabel txt-label txt-bold'
                  htmlFor='address'>
                  Street Address
                </label>
                <input
                  className={`editForm__input ${
                    errors.address ? 'editForm__invalid-input' : ''
                  }`}
                  name='address'
                  type='text'
                  placeholder='Street Address'
                  value={warehouseDetails.address}
                  onChange={handleInputChange}
                />
                {errors.address && (
                  <span className='error txt-label'>
                    <img src={errorIcon} alt='Error Alert' />
                    {errors.address}
                  </span>
                )}
              </div>
              <div className='editForm__inputLabelWrapper'>
                <label
                  className='editForm__inputLabel txt-label txt-bold'
                  htmlFor='city'>
                  City
                </label>
                <input
                  className={`editForm__input ${
                    errors.city ? 'editForm__invalid-input' : ''
                  }`}
                  name='city'
                  type='text'
                  placeholder='City'
                  value={warehouseDetails.city}
                  onChange={handleInputChange}
                />
                {errors.city && (
                  <span className='error txt-label'>
                    <img src={errorIcon} alt='Error Alert' />
                    {errors.city}
                  </span>
                )}
              </div>
              <div className='editForm__inputLabelWrapper'>
                <label
                  className='editForm__inputLabel txt-label txt-bold'
                  htmlFor='country'>
                  Country
                </label>
                <input
                  className={`editForm__input ${
                    errors.country ? 'editForm__invalid-input' : ''
                  }`}
                  name='country'
                  type='text'
                  placeholder='Country'
                  value={warehouseDetails.country}
                  onChange={handleInputChange}
                />
                {errors.country && (
                  <span className='error txt-label'>
                    <img src={errorIcon} alt='Error Alert' />
                    {errors.country}
                  </span>
                )}
              </div>
            </div>
          </div>
          <div className='editWarehouseForm__divider editWarehouseForm__divider--horizontal'></div>
          <div className='editWarehouseForm__divider editWarehouseForm__divider--vertical'></div>
          <div className='formWrapper__contact-details editForm__contact'>
            <div className='form-padding-side'>
              <div className='txt-subheader txt-bold txt-black subheader_spacing'>
                Contact Details
              </div>
              <div className='editForm__inputLabelWrapper'>
                <label
                  className='editForm__inputLabel txt-label txt-bold'
                  htmlFor='contact_name'>
                  Contact Name
                </label>
                <input
                  className={`editForm__input ${
                    errors.contact_name ? 'editForm__invalid-input' : ''
                  }`}
                  name='contact_name'
                  type='text'
                  placeholder='Contact Name'
                  value={warehouseDetails.contact_name}
                  onChange={handleInputChange}
                />
                {errors.contact_name && (
                  <span className='error txt-label'>
                    <img src={errorIcon} alt='Error Alert' />
                    {errors.contact_name}
                  </span>
                )}
              </div>
              <div className='editForm__inputLabelWrapper'>
                <label
                  className='editForm__inputLabel txt-label txt-bold'
                  htmlFor='contact_position'>
                  Position
                </label>
                <input
                  className={`editForm__input ${
                    errors.contact_position ? 'editForm__invalid-input' : ''
                  }`}
                  name='contact_position'
                  type='text'
                  placeholder='Position'
                  value={warehouseDetails.contact_position}
                  onChange={handleInputChange}
                />
                {errors.contact_position && (
                  <span className='error txt-label'>
                    <img src={errorIcon} alt='Error Alert' />
                    {errors.contact_position}
                  </span>
                )}
              </div>
              <div className='editForm__inputLabelWrapper'>
                <label
                  className='editForm__inputLabel txt-label txt-bold'
                  htmlFor='contact_phone'>
                  Phone Number
                </label>
                <input
                  className={`editForm__input ${
                    errors.contact_phone ? 'editForm__invalid-input' : ''
                  }`}
                  name='contact_phone'
                  type='tel'
                  placeholder='Phone Number'
                  value={warehouseDetails.contact_phone}
                  onChange={handleInputChange}
                />
                {errors.contact_phone && (
                  <span className='error txt-label'>
                    <img src={errorIcon} alt='Error Alert' />
                    {errors.contact_phone}
                  </span>
                )}
              </div>
              <div className='editForm__inputLabelWrapper'>
                <label
                  className='editForm__inputLabel txt-label txt-bold'
                  htmlFor='contact_email'>
                  Email
                </label>
                <input
                  className={`editForm__input ${
                    errors.contact_email ? 'editForm__invalid-input' : ''
                  }`}
                  name='contact_email'
                  type='email'
                  placeholder='Email'
                  value={warehouseDetails.contact_email}
                  onChange={handleInputChange}
                />
                {errors.contact_email && (
                  <span className='error txt-label'>
                    <img src={errorIcon} alt='Error Alert' />
                    {errors.contact_email}
                  </span>
                )}
              </div>
            </div>
          </div>
        </form>
      </div>
      <div className='editForm__buttonContainer'>
        <button
          className='editWarehouseForm__btn editWarehouseForm__btn--cancel txt-bold'
          aria-label='Cancel Changes'
          onClick={formCancellation}>
          Cancel
        </button>
        <button
          className='editWarehouseForm__btn editWarehouseForm__btn--save txt-bold'
          aria-label='Submit'
          type='submit'
          form='editWarehouseForm'>
          Save
        </button>
      </div>
    </div>
  );
};

export default EditWarehouse;