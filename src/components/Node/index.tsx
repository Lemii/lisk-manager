import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';

import Head from './Head';
import StatusTable from './StatusTable';
import Bars from './Bars';

import {
  fetchNodeStatus,
  fetchSystemInfo,
  fetchForgingStatus,
  toggleForgingStatus,
  getInterval
} from '../../utils';
import { INodeStatus, INode, IUpdateMethods, ISystemInfo } from '../../interfaces';

interface IProps {
  node: INode;
  methods: IUpdateMethods;
}

export default function Node({ node, methods }: IProps): JSX.Element {
  const [nodeStatus, setNodeStatus] = useState<INodeStatus | null>(null);
  const [systemInfo, setSystemInfo] = useState<ISystemInfo | null>(null);
  const [forgingStatus, setForgingStatus] = useState<boolean | null>(null);
  const [toggleDisabled, setToggleDisabled] = useState<boolean>(false);

  const updateNodeStatus = async () => {
    try {
      const data: INodeStatus = await fetchNodeStatus(node.ip);
      setNodeStatus(data);
    } catch {
      if (nodeStatus) {
        new Notification('Lisk Manager', {
          body: `Node '${node.label}' is not reachable anymore`
        });
      }

      setNodeStatus(null);
    }
  };

  const updateSystemInfo = async () => {
    try {
      const data: ISystemInfo = await fetchSystemInfo(node.ip);
      setSystemInfo(data);
    } catch {
      if (systemInfo) {
        new Notification('Lisk Manager', {
          body: `Failed to fetch system info for node '${node.label}'`
        });
      }

      setSystemInfo(null);
    }
  };

  const updateForgingStatus = async (check = true) => {
    if (check && !nodeStatus) {
      return;
    }

    try {
      const data = await fetchForgingStatus(node.ip);
      const newStatus = data.data.data[0].forging;

      if (forgingStatus && !newStatus) {
        new Notification('Lisk Manager', {
          body: `Node '${node.label}' has lost forging status`
        });
      }

      setForgingStatus(newStatus);
    } catch {
      setForgingStatus(null);
    }
  };

  useEffect(() => {
    const id = setInterval(() => {
      updateForgingStatus();
      updateNodeStatus();
      updateSystemInfo();
    }, getInterval());

    return () => {
      clearInterval(id);
    };
  }, [node, forgingStatus, nodeStatus]);

  useEffect(() => {
    updateNodeStatus().then(() => {
      updateForgingStatus(false);
    });
    updateSystemInfo();
  }, []);

  const toggleForging = async (checked: boolean) => {
    setToggleDisabled(true);

    try {
      const data = await toggleForgingStatus(node, checked);
      const status = data.data.data[0].forging;
      setForgingStatus(status);
      setToggleDisabled(false);
      toast.success(`Forging status set to: ${status}`);
    } catch {
      toast.error('Could not toggle forging. Verify public key and/or password.');
      setToggleDisabled(false);
    }
  };

  return (
    <div className="text-light col-sm-12 col-md-6 col-lg-4 my-4">
      <div className="card accent">
        <div className="card-body">
          <Head
            node={node}
            methods={methods}
            nodeStatus={nodeStatus}
            forgingStatus={forgingStatus}
          />

          {nodeStatus ? (
            <StatusTable
              node={node}
              nodeStatus={nodeStatus}
              toggleForging={toggleForging}
              forgingStatus={forgingStatus}
              toggleDisabled={toggleDisabled}
            />
          ) : (
            <p className="text-center text-danger mt-4">Lisk Core connection error</p>
          )}

          {systemInfo ? (
            <Bars node={node} systemInfo={systemInfo} />
          ) : (
            <div className="text-muted text-center">
              Could not fetch system info. More info <Link to="/docs">here</Link>.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
