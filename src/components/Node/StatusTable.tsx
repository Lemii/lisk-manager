import React from 'react';
import Switch from 'react-switch';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { formatNumber, formatDate } from '../../helpers';
import { INodeStatus, INode } from '../../interfaces';

interface IProps {
  node: INode;
  nodeStatus: INodeStatus;
  forgingStatus: boolean | null;
  toggleDisabled: boolean;
  toggleForging: (checked: boolean) => Promise<void>;
}

export default function StatusTable({
  node,
  nodeStatus,
  forgingStatus,
  toggleForging,
  toggleDisabled
}: IProps): JSX.Element {
  const CoreV2Table = () => (
    <table className="table">
      <tbody>
        <tr>
          <td>Forging enabled</td>
          {forgingStatus !== null ? (
            <td className="pt-0 pb-0 pl-0 align-middle">
              <Switch
                //@ts-ignore
                onChange={toggleForging}
                checked={forgingStatus || false}
                disabled={
                  toggleDisabled || forgingStatus === null || !node.password || !node.pubkey
                }
                onColor="#a3f7bf"
                onHandleColor="#fff"
                handleDiameter={30}
                uncheckedIcon={false}
                checkedIcon={false}
                boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
                activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
                height={20}
                width={48}
                className="react-switch scaled-down mt-1 ml-0"
                id="material-switch"
              />
            </td>
          ) : (
            <td>
              <div className="text-danger">No permission</div>
            </td>
          )}
        </tr>

        <tr>
          <td>Consensus</td>
          <td>{nodeStatus.consensus} %</td>
        </tr>

        <tr>
          <td>Height</td>
          <td>{formatNumber(nodeStatus.height)}</td>
        </tr>

        <tr>
          <td>Broadhash</td>
          <td title={nodeStatus.broadhash}>{nodeStatus.broadhash.substring(0, 10)}...</td>
        </tr>

        <tr>
          <td>Current time</td>
          <td>{formatDate(nodeStatus.currentTime)}</td>
        </tr>

        <tr>
          <td>Sec since epoch</td>
          <td>{formatNumber(nodeStatus.secondsSinceEpoch)}</td>
        </tr>

        <tr>
          <td>Network height</td>
          <td>{formatNumber(nodeStatus.networkHeight)}</td>
        </tr>

        <tr>
          <td>Loaded</td>
          <td>
            {nodeStatus.loaded ? (
              <FontAwesomeIcon icon="check" className="text-success" />
            ) : (
              <FontAwesomeIcon icon="times" className="text-danger" />
            )}
          </td>
        </tr>

        <tr>
          <td>Syncing</td>
          <td>
            {nodeStatus.syncing ? (
              <FontAwesomeIcon icon="check" className="text-success" />
            ) : (
              <FontAwesomeIcon icon="times" className="text-danger" />
            )}
          </td>
        </tr>
      </tbody>
    </table>
  );

  const CoreV3Table = () => (
    <table className="table">
      <tbody>
        <tr>
          <td>Forging enabled</td>
          {forgingStatus !== null ? (
            <td className="pt-0 pb-0 pl-0 align-middle">
              <Switch
                onChange={toggleForging}
                checked={forgingStatus || false}
                disabled={
                  toggleDisabled || forgingStatus === null || !node.password || !node.pubkey
                }
                onColor="#a3f7bf"
                onHandleColor="#fff"
                handleDiameter={30}
                uncheckedIcon={false}
                checkedIcon={false}
                boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
                activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
                height={20}
                width={48}
                className="react-switch scaled-down mt-1 ml-0"
                id="material-switch"
              />
            </td>
          ) : (
            <td>
              <div className="text-danger">No permission</div>
            </td>
          )}
        </tr>

        <tr>
          <td>Height</td>
          <td>{formatNumber(nodeStatus.height)}</td>
        </tr>

        <tr>
          <td>Max height finalized</td>
          <td>{formatNumber(nodeStatus.chainMaxHeightFinalized)}</td>
        </tr>
        <tr>
          <td>Current time</td>
          <td>{formatDate(nodeStatus.currentTime)}</td>
        </tr>

        <tr>
          <td>Sec since epoch</td>
          <td>{formatNumber(nodeStatus.secondsSinceEpoch)}</td>
        </tr>

        <tr>
          <td>Syncing</td>
          <td>
            {nodeStatus.syncing ? (
              <FontAwesomeIcon icon="check" className="text-success" />
            ) : (
              <FontAwesomeIcon icon="times" className="text-danger" />
            )}
          </td>
        </tr>
      </tbody>
    </table>
  );

  return node.version === '3' ? <CoreV3Table /> : <CoreV2Table />;
}
