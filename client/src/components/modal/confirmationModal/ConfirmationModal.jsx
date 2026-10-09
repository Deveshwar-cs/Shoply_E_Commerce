import { useEffect } from 'react';
import { CloseOutlined } from '@ant-design/icons';
import './ConfirmationModal.css';

const ConfirmationModal = ({
  open,
  title,
  description,
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  onConfirm,
  onCancel,
  loading = false,
}) => {
  useEffect(() => {
    if (!open) return;

    const handleKeyDown = (event) => {
      if (event.key === 'Escape' && !loading) {
        onCancel();
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [open, loading, onCancel]);

  if (!open) return null;

  return (
    <div className="confirmation-overlay" onMouseDown={onCancel}>
      <div
        className="confirmation-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="confirmation-title"
        onMouseDown={(event) => event.stopPropagation()}
      >
        <button
          type="button"
          className="confirmation-close"
          onClick={onCancel}
          disabled={loading}
          aria-label="Close confirmation"
        >
          <CloseOutlined />
        </button>

        <div className="confirmation-top">
          <span className="confirmation-label">SHOPLY / CONFIRMATION</span>

          <span className="confirmation-number">01</span>
        </div>

        <div className="confirmation-content">
          <h2 id="confirmation-title">{title}</h2>

          <p>{description}</p>
        </div>

        <div className="confirmation-actions">
          <button
            type="button"
            className="confirmation-cancel"
            onClick={onCancel}
            disabled={loading}
          >
            {cancelText}
          </button>

          <button
            type="button"
            className="confirmation-confirm"
            onClick={onConfirm}
            disabled={loading}
          >
            <span>{loading ? 'Please wait...' : confirmText}</span>
            {!loading && <span>↗</span>}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
