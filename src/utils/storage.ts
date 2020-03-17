import { INode } from '../interfaces';

export const getLocalNodes = (): INode[] => {
  const nodes = localStorage.getItem('nodes');

  if (!nodes) {
    return [];
  }

  return JSON.parse(nodes);
};

export const setLocalNodes = (nodes: INode[]): void => {
  const stringified = JSON.stringify(nodes);

  localStorage.setItem('nodes', stringified);
};

export const updateLocalnode = (updatedNode: INode): void => {
  const nodes = getLocalNodes();

  const index = nodes.map(node => node.id).indexOf(updatedNode.id);

  nodes[index] = updatedNode;

  setLocalNodes(nodes);
};

export const deleteLocalNode = (id: string): void => {
  const nodes = getLocalNodes();

  const index = nodes.map(node => node.id).indexOf(id);

  nodes.splice(index, 1);

  setLocalNodes(nodes);
};
