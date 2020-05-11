import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Redirect } from 'react-router-dom';
import { toast } from 'react-toastify';

import ConfirmModal from '../../components/ConfirmModal';

import {
  getPasswordHash,
  setPasswordHash,
  removePasswordHash,
  clearNodePasswords,
  hash
} from '../../utils';

import { PasswordContext } from '../../contexts';

export default function Auth(): JSX.Element {
  const [password, setPassword] = useState<string>('');
  const [redirect, setRedirect] = useState<boolean>(false);
  const [showConfirm, setShowConfirm] = useState<boolean>(false);

  const context = useContext(PasswordContext);

  useEffect(() => {
    document.title = 'Authorize | Lisk Manager';

    if (process.env.NODE_ENV === 'development') {
      context.update('test');
      setRedirect(true);
    }
  }, [context]);

  const handleSubmit = (e: React.SyntheticEvent): void => {
    e.preventDefault();

    const storedHash = getPasswordHash();
    const inputHash = hash(password);

    if (!storedHash || inputHash === storedHash) {
      toast.success('Succesfully authorized');

      if (!storedHash) {
        setPasswordHash(inputHash);
      }

      context.update(password);
      setRedirect(true);
      return;
    }

    toast.error('Password mismatch, could not authorize');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { value } = e.target;

    setPassword(value);
  };

  const handleReset = (): void => {
    setPassword('');
    setShowConfirm(false);

    clearNodePasswords();
    removePasswordHash();

    toast.success('All password data removed successfully');
  };

  return (
    <div className="container text-light">
      <h5 className="mb-4">Authorize</h5>

      <form onSubmit={handleSubmit}>
        <div className="form-group mb-4">
          <input type="text" className="hidden" autoComplete="application" readOnly />
          <label htmlFor="app-password">
            <strong>Enter password</strong>
          </label>
          <input
            name="app-password"
            value={password}
            onChange={handleChange}
            type="password"
            className="form-control"
            id="app-password"
            aria-describedby="app-password"
            placeholder="*******************"
            autoComplete="new-password"
          />
          <small id="app-password-help" className="form-text text-muted">
            Used to encrypt and decrypt sensitive data. Read more <Link to="/docs">here</Link>.
          </small>
        </div>

        <button type="submit" className="btn btn-sm btn-primary" disabled={!password.length}>
          Proceed <FontAwesomeIcon icon="sign-in-alt" />
        </button>

        <button
          type="button"
          onClick={() => setShowConfirm(true)}
          className="btn btn-sm btn-outline-primary ml-3"
        >
          Reset <FontAwesomeIcon icon="undo-alt" />
        </button>
      </form>

      <ConfirmModal
        body="This action will reset all password data"
        confirmHandler={handleReset}
        show={showConfirm}
        setShow={setShowConfirm}
      />
      {redirect && <Redirect to="/" />}
    </div>
  );
}
