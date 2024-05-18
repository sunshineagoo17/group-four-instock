import './WarehouseDeleteModal.scss';
import closeIcon from '../../assets/images/close-24px.svg';

const WarehouseDeleteModal = ({ show, onClose, onDelete, warehouseName }) => {
  if (!show) {
    return null;
  }

  return (
    <div className='warehouse-modal__overlay'>
      <div className='warehouse-modal'>
        <div className='warehouse-modal__bg'>
          <div className='warehouse-modal__close-btn'>
            <img
              src={closeIcon}
              alt='close'
              className='warehouse-modal__close-icon'
              onClick={onClose}
            />
          </div>
          <h1 className='warehouse-modal__title'>Delete {warehouseName} warehouse?</h1>
          <p className='warehouse-modal__txt'>
            Please confirm that you’d like to delete the {warehouseName} from the list of warehouses. You won’t be able to undo this action.
          </p>
          <div className='warehouse-modal__buttons'>
            <button className='btn btn-cancel' onClick={onClose}>
              Cancel
            </button>
            <button className='btn btn-delete' onClick={onDelete}>
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WarehouseDeleteModal;
