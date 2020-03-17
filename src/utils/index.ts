import axios from 'axios';
import { INode } from '../interfaces';

export const fetchNodeStatus = (node: string) =>
  axios.get(node + '/api/node/status').then(res => res.data.data);

export const fetchForgingStatus = (node: string) => axios.get(node + '/api/node/status/forging');

export const toggleForgingStatus = (node: INode, checked: boolean) =>
  axios.put(node.ip + '/api/node/status/forging', {
    publicKey: node.pubkey,
    password: node.password,
    forging: checked
  });
