import { Asset } from "./asset.interface";

export interface Wallet {
    id: string;
    name: string;
    organization: string;
    group: string;
    address: string;
    blockchain: string;
    total_usd_balance: string;
    pending_usd_balance: string;
    description: string;
    image: string;
    num_quorum: number;
    assets: Asset[];
  }
  