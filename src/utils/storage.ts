import { saveJsonFile } from '../utils/file-handler';

import { INode, IJsonData } from '../interfaces';

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

export const clearNodePasswords = (): void => {
  const nodes = getLocalNodes();

  nodes.forEach(node => node.password && delete node.password);

  setLocalNodes(nodes);
};

export const setInterval = (amount: number): void => {
  localStorage.setItem('interval', String(amount));
};

export const getInterval = (): number => {
  const amount = localStorage.getItem('interval');

  return amount ? Number(amount) : 10000;
};

export const setPasswordHash = (amount: string): void => {
  localStorage.setItem('hash', String(amount));
};

export const getPasswordHash = (): string => {
  return localStorage.getItem('hash')!;
};

export const removePasswordHash = (): void => {
  localStorage.removeItem('hash');
};

export const exportData = (): void => {
  const data = {
    hash: getPasswordHash(),
    nodes: getLocalNodes(),
    settings: { interval: getInterval() }
  };

  saveJsonFile(data);
};

export const importData = (data: IJsonData): void => {
  try {
    if (data.hash) {
      setPasswordHash(data.hash);
    }

    if (data.nodes) {
      setLocalNodes(data.nodes);
    }

    if (data.settings.interval) {
      setInterval(data.settings.interval);
    }
  } catch {
    setLocalNodes(getLocalNodes());
    setInterval(getInterval());
    throw Error();
  }
};
