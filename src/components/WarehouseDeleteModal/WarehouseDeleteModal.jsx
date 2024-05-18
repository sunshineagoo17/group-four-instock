import './WarehouseDeleteModal.scss';
import closeIcon from '../../assets/images/close-24px.svg';

const WarehouseDeleteModal = ({ show, onClose, onDelete, warehouseName }) => {
  if (!show) {
    return null;
  }

  return (
    // For testing purposes
    <div className='warehouse-modal-overlay'>
      <div className='warehouse-modal'>
        <img
          src={closeIcon}
          alt='close'
          className='warehouse-modal-close-icon'
          onClick={onClose}
        />
        <h1>Delete {warehouseName} warehouse?</h1>
        <p>Are you sure you want to delete the warehouse {warehouseName}?</p>
        <div className='modal-buttons'>
          <button className='btn btn-cancel' onClick={onClose}>
            Cancel
          </button>
          <button className='btn btn-delete' onClick={onDelete}>
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default WarehouseDeleteModal;
