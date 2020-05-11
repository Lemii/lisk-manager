import axios, { AxiosResponse } from 'axios';

import { decrypt } from './crypto';
import { INode, INodeStatus, IForgingStatus, ISystemInfo } from '../interfaces';

export const fetchNodeStatus = (node: string): Promise<INodeStatus> =>
  axios.get(node + '/api/node/status').then((res) => res.data.data);

export const fetchSystemInfo = (node: string): Promise<ISystemInfo> => {
  return axios.get(node.split(':')[1] + ':8765/system').then((res) => res.data);
};

export const fetchForgingStatus = (node: string) => axios.get(node + '/api/node/status/forging');

export const toggleForgingStatus = (
  node: INode,
  checked: boolean
): Promise<AxiosResponse<IForgingStatus>> =>
  axios.put(node.ip + '/api/node/status/forging', {
    publicKey: node.pubkey,
    password: decrypt(node.password!, node.id),
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
