import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

import Head from './Head';
import StatusTable from './StatusTable';

import { fetchNodeStatus, fetchForgingStatus, toggleForgingStatus } from '../../utils';
import { INodeStatus, INode } from '../../interfaces';

interface IProps {
  node: INode;
  methods: any;
}

export default function Node({ node, methods }: IProps): JSX.Element {
  const [nodeStatus, setNodeStatus] = useState<INodeStatus | null>(null);
  const [forgingStatus, setForgingStatus] = useState<boolean | null>(null);
  const [toggleDisabled, setToggleDisabled] = useState<boolean>(false);

  useEffect(() => {
    const updateNodeStatus = async () => {
      try {
        const data: INodeStatus = await fetchNodeStatus(node.ip);
        setNodeStatus(data);
      } catch {
        setNodeStatus(null);
      }
    };

    const updateForgingStatus = async () => {
      try {
        const data = await fetchForgingStatus(node.ip);
        setForgingStatus(data.data.data[0].forging);
      } catch {
        setForgingStatus(null);
      }
    };

    updateForgingStatus();
    updateNodeStatus();

    const intervalId = setInterval(() => {
      updateForgingStatus();
      updateNodeStatus();
    }, 10000);

    return () => {
      clearInterval(intervalId);
    };
  }, [node]);

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
