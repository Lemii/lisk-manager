import React from 'react';
import Modal from 'react-bootstrap/Modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

interface IProps {
  body: string;
  confirmHandler: any;
  show: boolean;
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function ConfirmModal({ body, confirmHandler, show, setShow }: IProps): JSX.Element {
  const handleClose = (): void => {
    setShow(false);
  };

  const handleSubmit = (e: React.SyntheticEvent): void => {
    e.preventDefault();

    confirmHandler();
  };

  return (
    <Modal show={show} onHide={handleClose} className="text-light p-3">
      <form onSubmit={handleSubmit}>
        <Modal.Body>
          <h4 className="mb-3">{body}</h4>

          <div className="text-right">
            <button
              className="btn btn-sm btn-outline-primary mr-2"
              onClick={handleClose}
              type="button"
            >
              Cancel
            </button>
            <button className="btn btn-sm btn-danger" type="submit">
              Confirm <FontAwesomeIcon icon="trash-alt" />
            </button>
          </div>
        </Modal.Body>
      </form>
    </Modal>
  );
}
