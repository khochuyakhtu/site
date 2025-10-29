import clsx from 'clsx';
import './StatusMessage.css';

const StatusMessage = ({ tone = 'info', title, description, items }) => {
  if (!title && !description && (!items || items.length === 0)) {
    return null;
  }

  return (
    <div className={clsx('status-message', `status-message--${tone}`)}>
      {title && <strong className="status-message__title">{title}</strong>}
      {description && <p className="status-message__description">{description}</p>}
      {Array.isArray(items) && items.length > 0 && (
        <ul className="status-message__list">
          {items.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default StatusMessage;
