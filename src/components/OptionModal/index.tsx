import React, { useState, useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { INode } from '../../interfaces';

interface IProps {
  node: INode;
  body: string;
  submitHandler: any;
  show: boolean;
  setShow: any;
  initialValue?: string;
  type?: string;
  name: string;
}

export default function OptionModal({
  node,
  body,
  submitHandler,
  show,
  setShow,
  initialValue,
  type = 'text',
  name
}: IProps): JSX.Element {
  const [input, setInput] = useState<string>('');

  const handleClose = (): void => {
    setShow(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { value } = e.target;
    setInput(value);
  };

  const handleSubmit = (e: React.SyntheticEvent): void => {
    e.preventDefault();

    if (input || type === 'deletion') {
      submitHandler(node, input);
      setInput('');
      setShow(false);
    }
  };

  useEffect(() => {
    if (initialValue && type !== 'password') {
      setInput(initialValue);
    }
  }, [initialValue, type]);

  return (
    <Modal show={show} onHide={handleClose} className="text-light">
      <form onSubmit={handleSubmit}>
        {type !== 'deletion' ? (
          <Modal.Body>
            <label htmlFor={name}>
              <h4>{body}</h4>
            </label>

            <input
              value={input}
              onChange={handleChange}
              type={type}
              className="form-control mb-4"
              name={name}
              id={name}
            />

            <div className="text-right">
              <button
                className="btn btn-sm btn-outline-primary mr-2"
                onClick={handleClose}
                type="button"
              >
                Close
              </button>
              <button className="btn btn-sm btn-primary" type="submit">
                Save <FontAwesomeIcon icon="save" />
              </button>
            </div>
          </Modal.Body>
        ) : (
          <Modal.Body>
            <label htmlFor={name}>
              <h4>{body}</h4>
            </label>

            <div className="text-right">
              <button
                className="btn btn-sm btn-outline-primary mr-2"
                onClick={handleClose}
                type="button"
              >
                Cancel
              </button>
              <button className="btn btn-sm btn-primary" type="submit">
                Remove <FontAwesomeIcon icon="trash-alt" />
              </button>
            </div>
          </Modal.Body>
        )}
      </form>
    </Modal>
  );
}
