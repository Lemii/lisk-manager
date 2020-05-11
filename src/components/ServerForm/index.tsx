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
  const [manualVersion, setManualVersion] = useState<boolean>(false);
  const [ignoreErrors, setIgnoreErrors] = useState<boolean>(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>): void => {
    const { name, value } = e.target;

    if (name === 'ip' && !manualVersion) {
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

  const handleErrorIgnore = () => {
    setManualVersion(!ignoreErrors);
    setIgnoreErrors(!ignoreErrors);
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
          <strong>Node Version (detected automagically)</strong>
        </label>
        <select
          disabled={!manualVersion}
          name="version"
          value={form.version}
          className={`custom-select ${!manualVersion && 'text-muted'}`}
          id="version"
          aria-describedby="version"
          {...(manualVersion && { onChange: handleChange })}
        >
          <option value="0">Unknown</option>
          <option value="2">Core 2.x.x</option>
          <option value="3">Core 3.x.x</option>
        </select>

        <div className="form-check mt-2">
          <input
            disabled={ignoreErrors}
            className="form-check-input"
            type="checkbox"
            checked={manualVersion}
            id="manual-check"
            onChange={() => setManualVersion(!manualVersion)}
          />
          <label className="form-check-label" htmlFor="manual-check">
            Manual selection
          </label>
        </div>
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

      <div className="form-group">
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

      <div className="form-check">
        <input
          className="form-check-input"
          type="checkbox"
          checked={ignoreErrors}
          id="ignore-errors"
          onChange={handleErrorIgnore}
        />
        <label className="form-check-label" htmlFor="ignore-errors">
          Ignore validation errors
        </label>
      </div>

      <button
        type="submit"
        className="btn btn-sm btn-primary mt-4"
        disabled={!form.ip || !form.label || form.version === '0'}
      >
        Add Node <FontAwesomeIcon icon="save" />
      </button>
    </form>
  );
}
