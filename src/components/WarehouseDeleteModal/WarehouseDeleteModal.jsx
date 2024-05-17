import './WarehouseDeleteModal.scss';
import closeIcon from '../../assets/images/close-24px.svg';

const WarehouseDeleteModal = ({ show, onClose, onDelete, warehouseName }) => {
    if (!show) {
        return null;
    }
}

return (
    <div className='warehouse-modal-overlay'>
        <div className='warehouse-modal'>
            <h1>Delete {warehouseName} warehouse?</h1>
            
        </div>
    </div>
)