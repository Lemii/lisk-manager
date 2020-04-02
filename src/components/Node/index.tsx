import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

import Head from './Head';
import StatusTable from './StatusTable';

import { fetchNodeStatus, fetchForgingStatus, toggleForgingStatus, getInterval } from '../../utils';
import { INodeStatus, INode, IUpdateMethods } from '../../interfaces';

interface IProps {
  node: INode;
  methods: IUpdateMethods;
}

export default function Node({ node, methods }: IProps): JSX.Element {
  const [nodeStatus, setNodeStatus] = useState<INodeStatus | null>(null);
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
    }, getInterval());

    return () => {
      clearInterval(id);
    };
  }, [node, forgingStatus, nodeStatus]);

  useEffect(() => {
    updateNodeStatus().then(() => {
      updateForgingStatus(false);
    });
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
      <div className={`card accent`}>
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
            <p className="text-center text-danger mt-4">Connection error</p>
          )}
        </div>
      </div>
    </div>
  );
}
