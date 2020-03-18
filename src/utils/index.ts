import axios from 'axios';
import { INode, INodeStatus } from '../interfaces';

export const fetchNodeStatus = (node: string): Promise<INodeStatus> =>
  axios.get(node + '/api/node/status').then(res => res.data.data);

export const fetchForgingStatus = (node: string) => axios.get(node + '/api/node/status/forging');

export const toggleForgingStatus = (node: INode, checked: boolean) =>
  axios.put(node.ip + '/api/node/status/forging', {
    publicKey: node.pubkey,
    password: node.password,
    forging: checked
  });

export const fetchNodeVersion = async (node: string): Promise<string> => {
  const nodeStatus = await fetchNodeStatus(node);

  if ('chainMaxHeightFinalized' in nodeStatus) {
    return '3';
  }

  if ('consensus' in nodeStatus) {
    return '2';
  }

  return '0';
};
