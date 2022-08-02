import { Injectable } from '@angular/core';
import * as ethers from 'ethers';

declare var window: any

@Injectable({
  providedIn: 'root'
})
export class WalletService {

  wallet: string = "";
  connected: boolean = false;
  constructor() { }

  async getWallet() {
    const provider = new ethers.providers.Web3Provider(window.ethereum, "any");
    const signer = provider.getSigner();
    return await signer.getAddress();
  }

  async connectWallet(){
    const provider = new ethers.providers.Web3Provider(window.ethereum, "any");
    
    await provider.send("eth_requestAccounts", []);
    const signer = provider.getSigner();
    localStorage.setItem("connected", "true");
    localStorage.setItem("wallet", await signer.getAddress());

    return {
      wallet: await signer.getAddress(),
      connected: true
    }
    

    
  }
}
