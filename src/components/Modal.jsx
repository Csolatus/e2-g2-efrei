import { useEffect } from 'react';

/**
 * Modale réutilisable : le contenu est fourni par le parent via `children`.
 * Construite en React pur (classes Bootstrap sans son JS) pour ne pas entrer
 * en conflit avec le rendu React.
 */
function Modal({ isOpen, title, onClose, children }) {
  useEffect(() => {
    if (!isOpen) return undefined;

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <>
      <div
        className="modal d-block"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        onClick={onClose}
      >
        <div className="modal-dialog modal-lg modal-dialog-scrollable" onClick={(event) => event.stopPropagation()}>
          <div className="modal-content">
            <div className="modal-header">
              <h2 className="modal-title fs-4" id="modal-title">{title}</h2>
              <button type="button" className="btn-close" aria-label="Fermer" onClick={onClose} autoFocus />
            </div>
            <div className="modal-body">{children}</div>
          </div>
        </div>
      </div>
      <div className="modal-backdrop show" />
    </>
  );
}

export default Modal;
