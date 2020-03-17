export interface INodeStatus {
  broadhash: string;
  consensus: number;
  currentTime: number;
  secondsSinceEpoch: number;
  height: number;
  loaded: boolean;
  networkHeight: number;
  syncing: boolean;
  transactions: {
    confirmed: number;
    ready: number;
    verified: number;
    pending: number;
    validated: number;
    received: number;
    total: number;
  };
}

export interface IFaqEntry {
  question: string;
  answer: any;
}

export interface INode {
  id: string;
  ip: string;
  label: string;
  version: string;
  pubkey?: string;
  password?: string;
}
