import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

import Node from '../../components/Node';

import { getLocalNodes, deleteLocalNode, updateLocalnode } from '../../utils/storage';
import { askNotificationPermission } from '../../utils/notifications';
import { INode } from '../../interfaces';

export default function Overview(): JSX.Element {
  const [nodes, setNodes] = useState<INode[]>(getLocalNodes());

  useEffect(() => {
    document.title = 'Lisk Manager';
    askNotificationPermission();
  }, []);

  const methods = {
    rename: (node: INode): void => {
      const label = window.prompt('Please enter a new label', node.label);
      if (label) {
        updateLocalnode({ ...node, label });
        setNodes(getLocalNodes());
        toast.success(`Label updated successfully`);
      }
    },
    changePubkey: (node: INode): void => {
      const pubkey = window.prompt('Please enter a new public key', node.pubkey);
      if (pubkey) {
        updateLocalnode({ ...node, pubkey });
        setNodes(getLocalNodes());
        toast.success(`Public key updated successfully`);
      }
    },
    changePassword: (node: INode): void => {
      const password = window.prompt('Please enter a new password', node.password);
      if (password) {
        updateLocalnode({ ...node, password });
        setNodes(getLocalNodes());
        toast.success(`Password updated successfully`);
      }
    },
    delete: (node: INode): void => {
      if (window.confirm('Are you sure you want to delete the node?')) {
        deleteLocalNode(node.id);
        setNodes(getLocalNodes());
        toast.success(`Node '${node.label}' removed succesfully`);
      }
    }
  };

  return (
    <div className="container">
      <div className="row justify-content-center">
        {nodes.map(node => (
          <Node key={node.id} node={node} methods={methods} />
        ))}
      </div>

      {!nodes.length && (
        <div className="text-center">
          <h5 className="text-muted">No nodes found</h5>
          <Link to="/add" className="mt-3 btn btn-sm btn-outline-primary">
            Add node
          </Link>
        </div>
      )}
    </div>
  );
}
