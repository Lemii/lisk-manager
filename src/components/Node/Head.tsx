import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import OptionModal from '../OptionModal';

import { INode, INodeStatus } from '../../interfaces';

interface IProps {
  node: INode;
  methods: any;
  nodeStatus: INodeStatus | null;
  forgingStatus: boolean | null;
}

export default function Head({ node, methods, nodeStatus, forgingStatus }: IProps): JSX.Element {
  const [showLabel, setShowLabel] = useState<boolean>(false);
  const [showPubkey, setShowPubkey] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showDelete, setShowDelete] = useState<boolean>(false);

  const checkNodeHealth = (): boolean => {
    if (node.version === '2') {
      return nodeStatus ? nodeStatus.consensus >= 66 : false;
    }

    if (node.version === '3') {
      return nodeStatus ? !nodeStatus.syncing : false;
    }

    return false;
  };

  const status = (): string => {
    const healthy = checkNodeHealth();

    if (healthy && forgingStatus) {
      return 'success';
    }

    if (healthy && forgingStatus === false) {
      return 'secondary';
    }

    if (healthy && forgingStatus === null) {
      return 'warning';
    }

    return 'danger';
  };

  const circle = () => {
    const color = status();

    if (color === 'success') {
      return 'play-circle';
    }

    if (color === 'secondary') {
      return 'pause-circle';
    }

    if (color === 'warning') {
      return 'question-circle';
    }

    if (color === 'danger') {
      return 'stop-circle';
    }

    return 'pause-circle';
  };

  return (
    <div className="d-flex justify-content-between mb-3">
      <div>
        <h5>
          <FontAwesomeIcon icon={circle()} size="xs" className={`text-${status()} icon-mb`} />{' '}
          {node.label}
        </h5>

        <div className="text-muted">
          <strong>{node.ip}</strong> (Core v{node.version || '2'})
        </div>
      </div>

      <div className="dropdown">
        <h5
          role="button"
          id="dropdownMenuLink"
          data-toggle="dropdown"
          aria-haspopup="true"
          aria-expanded="false"
          className="drop"
        >
          <FontAwesomeIcon icon="bars" />
        </h5>
        <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
          <button onClick={() => setShowLabel(true)} className="dropdown-item">
            Rename
          </button>

          <OptionModal
            node={node}
            body="Enter new name"
            submitHandler={methods.rename}
            show={showLabel}
            setShow={setShowLabel}
            initialValue={node.label}
            name="label"
          />

          <button onClick={() => setShowPubkey(true)} className="dropdown-item">
            Change Public Key
          </button>

          <OptionModal
            node={node}
            body="Enter public key"
            submitHandler={methods.changePubkey}
            show={showPubkey}
            setShow={setShowPubkey}
            initialValue={node.pubkey}
            name="pubkey"
          />

          <button onClick={() => setShowPassword(true)} className="dropdown-item">
            Change Password
          </button>

          <OptionModal
            node={node}
            body="Enter new password"
            submitHandler={methods.changePassword}
            show={showPassword}
            setShow={setShowPassword}
            type="password"
            name="password"
          />

          <button onClick={() => setShowDelete(true)} className="dropdown-item">
            Delete Node
          </button>

          <OptionModal
            node={node}
            body="Confirm node removal"
            submitHandler={methods.delete}
            show={showDelete}
            setShow={setShowDelete}
            type="deletion"
            name="deletion"
          />
        </div>
      </div>
    </div>
  );
}
