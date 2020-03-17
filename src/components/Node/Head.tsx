import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { INode, INodeStatus } from '../../interfaces';

interface IProps {
  node: INode;
  methods: any;
  nodeStatus: INodeStatus | null;
  forgingStatus: boolean | null;
}

export default function Head({ node, methods, nodeStatus, forgingStatus }: IProps): JSX.Element {
  const status = () => {
    const consensus: number = nodeStatus ? nodeStatus.consensus : 0;

    if (consensus >= 66 && forgingStatus) {
      return 'success';
    }

    if (consensus >= 66 && forgingStatus === false) {
      return 'secondary';
    }

    if (consensus >= 66 && forgingStatus === null) {
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
          <strong>{node.ip}</strong>
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
          <button onClick={() => methods.rename(node)} className="dropdown-item">
            Rename
          </button>

          {/* <button className="dropdown-item">Toggle Forging</button> */}

          <button onClick={() => methods.changePubkey(node)} className="dropdown-item">
            Change Public Key
          </button>

          <button onClick={() => methods.changePassword(node)} className="dropdown-item">
            Change Password
          </button>

          <button onClick={() => methods.delete(node)} className="dropdown-item">
            Delete Node
          </button>
        </div>
      </div>
    </div>
  );
}
