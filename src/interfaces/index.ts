export interface INodeStatus {
  // 2.x values
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
  // 3.x values
  chainMaxHeightFinalized: number;
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
