import React, { useState, useEffect, useContext } from 'react';
import Dropzone from './DropZone';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { toast } from 'react-toastify';

import { PasswordContext } from '../../contexts';
import { setInterval, getInterval, exportData, importData } from '../../utils/storage';

export default function Settings(): JSX.Element {
  const [userInterval, setUserInterval] = useState<number>(getInterval());
  const [fileContent, setFileContent] = useState<string | null>(null);

  const { update } = useContext(PasswordContext);

  useEffect(() => {
    document.title = 'Settings | Lisk Manager';
  }, []);

  const saveInterval = () => {
    if (userInterval < 1000) {
      toast.warn('Interval must be at least 1000ms');
      return;
    }

    setInterval(userInterval);
    toast.success('Polling interval succesfully updated');
  };

  const handleImport = (e: React.SyntheticEvent): void => {
    e.preventDefault();

    if (!fileContent) {
      return;
    }

    try {
      importData(JSON.parse(fileContent));
      toast.success('Data import successful, please re-authorize');
      update(null);
    } catch {
      toast.error('Could not import data');
    }
  };

  return (
    <div className="container text-light">
      <h5 className="mb-4">Settings</h5>

      <div className="form-group">
        <label htmlFor="ip">
          <strong>Polling interval (ms)</strong>
        </label>
        <input
          name="interval"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setUserInterval(Number(e.target.value))
          }
          value={userInterval}
          min={1000}
          step={500}
          type="number"
          className="form-control"
          id="ip"
          aria-describedby="ip"
        />
      </div>

      <button onClick={saveInterval} className="btn btn-sm btn-primary">
        Save <FontAwesomeIcon icon="save" />
      </button>

      <hr className="border border-dark my-5" />

      <h5 className="mb-4">Export Lisk Manager Data</h5>

      <p>The following data is exported:</p>
      <ul>
        <li>Node data (id, label, ip, public key, password)</li>
        <li>Settings</li>
      </ul>

      <button onClick={exportData} className="btn btn-sm btn-primary">
        Export <FontAwesomeIcon icon="file-export" />
      </button>

      <hr className="border border-dark my-5" />

      <h5 className="mb-4">Import Lisk Manager Data</h5>

      <Dropzone setFileContent={setFileContent} />

      <p className="mt-3">Please note that importing data overwrites your current configuration!</p>

      <button onClick={handleImport} className="btn btn-sm btn-primary" disabled={!fileContent}>
        Import <FontAwesomeIcon icon="file-import" />
      </button>
    </div>
  );
}
