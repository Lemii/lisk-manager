import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { toast } from 'react-toastify';

import { fetchNodeVersion } from '../../utils';

import { INode } from '../../interfaces';

interface IProps {
  form: INode;
  setForm: React.Dispatch<React.SetStateAction<INode>>;
  handleSubmit: (e: React.SyntheticEvent<Element, Event>) => void;
}

export default function ServerForm({ form, setForm, handleSubmit }: IProps): JSX.Element {
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>): void => {
    const { name, value } = e.target;

    if (name === 'ip') {
      handleIpChange(value);
    }

    setForm({ ...form, [name]: value });
  };

  const handleIpChange = (ip: string): void => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    if (!ip) {
      return;
    }

    const id = setTimeout(async () => {
      try {
        const version = await fetchNodeVersion(ip);

        setForm({ ...form, ip, version });
        toast.info(`Core version ${version}.x.x detected`);
      } catch {
        toast.warn(
          `Could not detect Lisk core version. Verify protocol, IP address and port number.`
        );
      }
    }, 1500);

    setTimeoutId(id);
  };

  return (
    <form onSubmit={handleSubmit}>
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
        <label htmlFor="version">
          <strong>Node Version (updated automatically)</strong>
        </label>
        <select
          disabled
          name="version"
          value={form.version}
          className="custom-select text-muted"
          id="version"
          aria-describedby="version"
        >
          <option value="0">Unknown</option>
          <option value="2">Core 2.x.x</option>
          <option value="3">Core 3.x.x</option>
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
        type="submit"
        className="btn btn-sm btn-primary"
        disabled={!form.ip || !form.label || form.version === '0'}
      >
        Save <FontAwesomeIcon icon="save" />
      </button>
    </form>
  );
}
