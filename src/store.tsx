import { makeAutoObservable } from "mobx";
import sha256 from "crypto-js/sha256";
import { createContext, useContext, useEffect, FC } from "react";

interface IBLock {
  hash: string;
  transactions: Array<string>;
}

class BlockchainStore {
  blocks: Array<IBLock> = [];
  transactions: Array<string> = ["Start"];

  constructor() {
    makeAutoObservable(this);
  }

  addTransaction(message: string) {
    this.transactions.push(message);
  }

  writeBlock() {
    if (this.transactions.length === 0) {
      return;
    }
    // take all transactions from store
    const transactions = [...this.transactions];
    // zero out our transactions from store
    this.transactions = [];

    const prevBlock = this.blocks[this.blocks.length - 1] ?? { hash: "" };
    const hash = sha256(
      `${prevBlock.hash}${JSON.stringify(transactions)}`
    ).toString();
    // write transaction to block
    this.blocks.push({
      hash,
      transactions,
    });
  }
}
const StoreContext = createContext<BlockchainStore>(new BlockchainStore());

const StoreProvider: FC<{ store: BlockchainStore }> = ({ store, children }) => {
  return (
    <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
  );
};

const useStore = () => {
  return useContext(StoreContext);
};
export { BlockchainStore, StoreProvider, useStore };
