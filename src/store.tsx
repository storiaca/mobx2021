import { makeAutoObservable } from "mobx";
import sha256 from "crypto-js/sha256";
import { createContext, useContext, useEffect, FC } from "react";

interface IBLock {
  hash: string;
  transactions: Array<string>;
}

class BlockchainStore {
  blocks: Array<IBLock> = [];
  transactions: Array<string> = [];

  constructor() {
    makeAutoObservable(this)
  }

  addTransaction(message: string) {
    this.transactions.push(message);
  }
}
export {BlockchainStore};
