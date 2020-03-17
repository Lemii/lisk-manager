import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { INode } from '../../interfaces';

interface IProps {
  form: INode;
  setForm: any;
  handleSubmit: any;
}

export default function ServerForm({ form, setForm, handleSubmit }: IProps): JSX.Element {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>): void => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  // Placeholder
  const testNode = (e: any): void => {
    e.preventDefault();
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="ip">
          <strong>IP address</strong>
        </label>
        <input
          name="ip"
          value={form.ip}
          onChange={handleChange}
          type="text"
          className="form-control"
          id="ip"
          aria-describedby="ip"
          placeholder="http://104.217.2.11:8000"
        />
      </div>

      <div className="form-group">
        <label htmlFor="label">
          <strong>Label</strong>
        </label>
        <input
          name="label"
          value={form.label}
          onChange={handleChange}
          type="text"
          className="form-control"
          id="label"
          aria-describedby="label"
          placeholder="My Lisk Server"
        />
      </div>

      <div className="form-group">
        <label htmlFor="version">
          <strong>Node Version</strong>
        </label>
        <select
          name="version"
          value={form.version}
          onChange={handleChange}
          className="custom-select"
          id="version"
          aria-describedby="version"
        >
          <option value="2">Core 2.x</option>
          <option value="3">Core 3.x</option>
        </select>
      </div>

      <div className="form-group">
        <label htmlFor="pubkey">
          <strong>Delegate Public Key</strong> (optional)
        </label>
        <input
          name="pubkey"
          value={form.pubkey}
          onChange={handleChange}
          type="text"
          className="form-control"
          id="pubkey"
          aria-describedby="pubkey"
          placeholder="b3953cb16e2457b9be78ad8c8a2985435dedaed5f0dd63443bdfbccc92d09f2d"
        />
        <small id="pubkeyhelp" className="form-text text-muted">
          Used to toggle forging
        </small>
      </div>

      <div className="form-group mb-5">
        <label htmlFor="password">
          <strong>Encryption Password</strong> (optional)
        </label>
        <input
          name="password"
          value={form.password}
          onChange={handleChange}
          type="password"
          className="form-control"
          id="password"
          aria-describedby="password"
          placeholder="**************************"
        />
        <small id="passwordhelp" className="form-text text-muted">
          Used to toggle forging
        </small>
      </div>

      <button
        onClick={testNode}
        className="btn btn-outline-primary mr-3"
        disabled={!form.pubkey || !form.password}
      >
        Test <FontAwesomeIcon icon="signal" />
      </button>

      <button type="submit" className="btn btn-primary" disabled={!form.ip || !form.label}>
        Save <FontAwesomeIcon icon="save" />
      </button>
    </form>
  );
}
