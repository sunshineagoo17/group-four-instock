import './EditWarehouse.scss';
import backIcon from '../../assets/images/arrow_back-24px.svg';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link, useNavigate } from 'react-router-dom';

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

  const [originalDetails, setOriginalDetails] = useState({});
  // Error States
  const [emailError, setEmailError] = useState('');
  const [phoneError, setPhoneError] = useState('');
  const [emptyError, setEmptyError] = useState('');
  const [submit, setSubmit] = useState('');

  // Regex functions for validation
  const phoneRegex =
    /^\+?(\d{1,4})?[\s-]?(\(?\d{3}\)?)[\s-]?(\d{3})[\s-]?(\d{4})$/;
  const emailRegex = /^[\w-]+@([\w-]+\.)+[\w-]{2,4}$/;

  // Fetch warehouse details on component mount
  useEffect(() => {
    const fetchWarehouseDetails = async () => {
      try {
        const response = await axios.get(`${baseURL}/warehouses/${id}`);
        setWarehouseDetails(response.data);
        setOriginalDetails(response.data);
      } catch (error) {
        console.error('Error fetching warehouse details:', error);
      }
    };
    fetchWarehouseDetails();
  }, [id, baseURL]);

  // Function to reset only the invalid phone number field
  const resetPhoneNumberField = () => {
    setWarehouseDetails((prevDetails) => ({
      ...prevDetails,
      contact_phone: '',
    }));
  };

  // Function to reset only the invalid email field
  const resetEmailField = () => {
    setWarehouseDetails((prevDetails) => ({
      ...prevDetails,
      contact_email: '',
    }));
  };

  // Form reset following the clicking of the cancellation button or the 'OK' button for errors.
  const formCancellation = () => {
    setEmailError('');
    setPhoneError('');
    setEmptyError('');
    setSubmit('');
    setWarehouseDetails(originalDetails);
  };

  // Handle input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setWarehouseDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  // Function to format the phone number
  const formatPhoneNumber = (number) => {
    const cleaned = ('' + number).replace(/\D/g, '');
    const match = cleaned.match(/^(\d{1,4})(\d{3})(\d{3})(\d{4})$/);
    if (match) {
      return `+${match[1]} (${match[2]}) ${match[3]}-${match[4]}`;
    }
    return number;
  };

  // Function used upon submission of form
  const formSubmit = (event) => {
    event.preventDefault();
    setSubmit(''); // Clear the submit state on new form submission
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

    // Reset error states
    setEmptyError('');
    setPhoneError('');
    setEmailError('');

    // Form validation
    let hasError = false;
    if (
      [
        warehouse_name,
        address,
        city,
        country,
        contact_name,
        contact_position,
        contact_phone,
        contact_email,
      ].some((field) => !field)
    ) {
      setEmptyError('One or more fields are empty.');
      hasError = true;
    }
    if (!phoneRegex.test(contact_phone)) {
      setPhoneError('The phone number entered is incorrect.');
      resetPhoneNumberField();
      hasError = true;
    }
    if (!emailRegex.test(contact_email)) {
      setEmailError('The email you entered is incorrect.');
      resetEmailField();
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
          setSubmit('true');
        })
        .catch((error) => {
          console.log(error);
          setSubmit('false');
        });
    }
  };

  return (
    <div className='warehouseForm box-shadow'>
      <div className='warehouseForm__header list-padding-side'>
        <div className='warehouseForm__header_title txt-header txt-bold txt-black'>
          <img
            className='warehouseForm__back-btn'
            src={backIcon}
            alt='go back to list of warehouses'
            onClick={() => navigate('/')}
          />
          Edit {warehouseDetails.warehouse_name}
        </div>
      </div>
      <div className='divider'></div>
      <div className='formWrapper'>
        <div className='form-padding-side form-padding-topbottom'>
          <form
            className='editForm'
            id='editWarehouseInfo'
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
                  className='editForm__input'
                  name='warehouse_name'
                  placeholder='Warehouse Name'
                  type='text'
                  value={warehouseDetails.warehouse_name}
                  onChange={handleInputChange}
                />
              </div>
              <div className='editForm__inputLabelWrapper'>
                <label
                  className='editForm__inputLabel txt-label'
                  htmlFor='address'>
                  Street Address
                </label>
                <input
                  className='editForm__input'
                  name='address'
                  type='text'
                  placeholder='Street Address'
                  value={warehouseDetails.address}
                  onChange={handleInputChange}
                />
              </div>
              <div className='editForm__inputLabelWrapper'>
                <label
                  className='editForm__inputLabel txt-label'
                  htmlFor='city'>
                  City
                </label>
                <input
                  className='editForm__input'
                  name='city'
                  type='text'
                  placeholder='City'
                  value={warehouseDetails.city}
                  onChange={handleInputChange}
                />
              </div>
              <div className='editForm__inputLabelWrapper'>
                <label
                  className='editForm__inputLabel txt-label'
                  htmlFor='country'>
                  Country
                </label>
                <input
                  className='editForm__input'
                  name='country'
                  type='text'
                  placeholder='Country'
                  value={warehouseDetails.country}
                  onChange={handleInputChange}
                />
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
                  className='editForm__input'
                  name='contact_name'
                  type='text'
                  placeholder='Contact Name'
                  value={warehouseDetails.contact_name}
                  onChange={handleInputChange}
                />
              </div>
              <div className='editForm__inputLabelWrapper'>
                <label
                  className='editForm__inputLabel txt-label'
                  htmlFor='contact_position'>
                  Position
                </label>
                <input
                  className='editForm__input'
                  name='contact_position'
                  type='text'
                  placeholder='Position'
                  value={warehouseDetails.contact_position}
                  onChange={handleInputChange}
                />
              </div>
              <div className='editForm__inputLabelWrapper'>
                <label
                  className='editForm__inputLabel txt-label'
                  htmlFor='contact_phone'>
                  Phone Number
                </label>
                <input
                  className={`editForm__input ${
                    phoneError ? 'editForm__invalid-input' : ''
                  }`}
                  name='contact_phone'
                  type='tel'
                  placeholder='Phone Number'
                  value={warehouseDetails.contact_phone}
                  onChange={handleInputChange}
                />
              </div>
              <div className='editForm__inputLabelWrapper'>
                <label
                  className='editForm__inputLabel txt-label'
                  htmlFor='contact_email'>
                  Email
                </label>
                <input
                  className={`editForm__input ${
                    emailError ? 'editForm__invalid-input' : ''
                  }`}
                  name='contact_email'
                  type='email'
                  placeholder='Email'
                  value={warehouseDetails.contact_email}
                  onChange={handleInputChange}
                />
              </div>
            </div>
          </form>
        </div>
      </div>
      <div className='editForm__buttonContainer'>
        <button className='btn txt-bold btn--cancel' onClick={formCancellation}>
          Cancel
        </button>
        <button
          className='btn txt-bold btn--save'
          type='submit'
          form='editWarehouseInfo'>
          Save
        </button>
      </div>
      {submit === 'true' && (
        <div>
          <div className='message'>
            <>
              <p className='message__text'>
                Congratulations! You've edited the{' '}
                {warehouseDetails.warehouse_name} warehouse.
              </p>
              <Link to='/'>
                <button className='btn--confirmation'>OK</button>
              </Link>
            </>
          </div>
        </div>
      )}
      {submit !== 'true' && (emailError || phoneError || emptyError) && (
        <div className='message--error'>
          <>
            <p className='message__text--error'>{emailError}</p>
            <p className='message__text--error'>{phoneError}</p>
            <p className='message__text--error'>{emptyError}</p>
            <button
              className='btn--confirmation'
              onClick={() => {
                setEmailError('');
                setPhoneError('');
                setEmptyError('');
              }}>
              OK
            </button>
          </>
        </div>
      )}
    </div>
  );
};

export default EditWarehouse;