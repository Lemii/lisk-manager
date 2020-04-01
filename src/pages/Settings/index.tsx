import React, { useState, useEffect, useContext } from 'react';
import Dropzone from './DropZone';
import ConfirmModal from '../../components/ConfirmModal';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { toast } from 'react-toastify';

import { PasswordContext } from '../../contexts';
import { setInterval, getInterval, exportData, importData, removeAllData } from '../../utils';

export default function Settings(): JSX.Element {
  const [userInterval, setUserInterval] = useState<number>(getInterval());
  const [fileContent, setFileContent] = useState<string | null>(null);
  const [showConfirm, setShowConfirm] = useState<boolean>(false);

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

  const handleRemoveAll = (): void => {
    try {
      removeAllData();
      toast.success('Data successfully removed');
      update(null);
    } catch {
      toast.error('Could not remove data');
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

      <hr className="border border-dark my-5" />

      <h5 className="mb-4">Remove all Lisk Manager Data</h5>

      <p>
        Complete removes all Lisk Manager data. This includes:
        <ul>
          <li>Node data (id, label, ip, public key, password)</li>
          <li>Authorization</li>
          <li>Settings</li>
        </ul>
      </p>

      <button className="btn btn-sm btn-primary" onClick={() => setShowConfirm(true)}>
        Remove <FontAwesomeIcon icon="trash-alt" />
      </button>

      <ConfirmModal
        body="This action will remove ALL Lisk Manager data from your local machine!"
        confirmHandler={handleRemoveAll}
        show={showConfirm}
        setShow={setShowConfirm}
      />
    </div>
  );
}
