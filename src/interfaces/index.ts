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

export interface IJsonData {
  hash: string;
  nodes: INode[];
  settings: {
    interval?: number;
  };
}

export interface IForgingStatus {
  meta: {};
  data: {
    forging: boolean;
    publicKey: string;
  }[];
  links: {};
}

export interface IUpdateMethod {
  (node: INode, label: string): void;
}

export interface IUpdateMethods {
  rename: IUpdateMethod;
  changePubkey: IUpdateMethod;
  changePassword: IUpdateMethod;
  delete: (node: INode) => void;
}

export interface ISystemInfo {
  status: number;
  message: string;
  data: {
    hostname: string;
    loadAverage: number[];
    uptime: number;
    memory: {
      total: number;
      free: number;
    };
    disk: {
      total: number;
      free: number;
    };
    cpus: {
      model: string;
      speed: number;
      times: {
        user: number;
        nice: number;
        sys: number;
        idle: number;
        irq: number;
      };
    }[];
    type: string;
    release: string;
  };
}
