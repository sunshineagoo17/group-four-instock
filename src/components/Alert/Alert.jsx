import './Alert.scss';

// Component to display alert messages based on type (error, success, etc.)
const Alert = ({ message, type }) => {
  return (
    <div className={`alert alert-${type}`}>
      {message}
    </div>
  );
};

export default Alert;