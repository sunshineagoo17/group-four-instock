import './WarehouseDeleteModal.scss';
import closeIcon from '../../assets/images/close-24px.svg';
import { useEffect, useState } from 'react';

const WarehouseDeleteModal = ({ show, onClose, onDelete, warehouseName }) => {
  const [isWarehouseNameLong, setIsWarehouseNameLong] = useState(false);

  useEffect(() => {
    if (warehouseName.length > 20) { 
      setIsWarehouseNameLong(true);
    } else {
      setIsWarehouseNameLong(false);
    }
  }, [warehouseName]);

  if (!show) {
    return null;
  }

  return (
    <div className='warehouse-modal'>
      <div className='warehouse-modal__container box-shadow'>
        <div className='warehouse-modal__btn-close-container'>
          <button
            className='warehouse-modal__btn-close'
            onClick={onClose}
            aria-label='Close modal'>
            <img
              src={closeIcon}
              alt='Close'
              className='warehouse-modal__btn-close-icon'
            />
          </button>
        </div>
        <div className='warehouse-modal__content'>
          <h1 id='modal-title' className={`warehouse-modal__title ${isWarehouseNameLong ? 'warehouse-modal__title--small' : ''}`}>
            Delete {warehouseName} warehouse?
          </h1>
          <p id='modal-description' className='warehouse-modal__txt'>
            Please confirm that you’d like to delete the {warehouseName} from the list of warehouses. You won’t be able to undo this action.
          </p>
          <div className='warehouse-modal__buttons-container'>
            <button
              className='warehouse-modal__btn warehouse-modal__btn--cancel'
              onClick={onClose}
              aria-label='Cancel deletion'>
              Cancel
            </button>
            <button
              className='warehouse-modal__btn warehouse-modal__btn--delete'
              onClick={onDelete}
              aria-label='Confirm deletion'>
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WarehouseDeleteModal;