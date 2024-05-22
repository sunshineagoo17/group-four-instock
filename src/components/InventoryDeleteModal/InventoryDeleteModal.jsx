import './InventoryDeleteModal.scss';
import closeIcon from '../../assets/images/close-24px.svg';

const InventoryDeleteModal = ({ show, onClose, onDelete, itemName }) => {
  if (!show) {
    return null;
  }

  return (
    <div className='inventory-modal'>
      <div className='inventory-modal__container box-shadow'>
        <div className='inventory-modal__btn-close-container'>
          <button
            className='inventory-modal__btn-close'
            onClick={onClose}
            aria-label='Close modal'>
            <img
              src={closeIcon}
              alt='Close'
              className='inventory-modal__btn-close-icon'
            />
          </button>
        </div>
        <div className='inventory-modal__content'>
          <h1 id='modal-title' className='inventory-modal__title'>
            Delete {itemName} item?
          </h1>
          <p id='modal-description' className='inventory-modal__txt'>
            Please confirm that you’d like to delete {itemName} from the inventory list. You won’t be able to undo this action.            
          </p>
          <div className='inventory-modal__buttons-container'>
            <button
              className='inventory-modal__btn inventory-modal__btn--cancel'
              onClick={onClose}
              aria-label='Cancel deletion'>
              Cancel
            </button>
            <button
              className='inventory-modal__btn inventory-modal__btn--delete'
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

export default InventoryDeleteModal;