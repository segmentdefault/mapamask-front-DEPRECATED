import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Business } from '../interfaces/business.inteface';
import { BusinessService } from '../services/business.service';
import { WalletService } from '../services/wallet.service';

declare var window: any

@Component({
  selector: 'app-mis-negocios',
  templateUrl: './mis-negocios.component.html',
  styleUrls: ['./mis-negocios.component.scss']
})
export class MisNegociosComponent implements OnInit {

  wallet: string = "";
  ownBusiness: Array<Business> = [];
  searchLoading: boolean = true;
  idToRemove: string = "0";
  connected: boolean = false;

  constructor(
    private businessService: BusinessService,
    private walletService: WalletService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    if(window.ethereum){
      window.ethereum.on('accountsChanged', async () => {
        this.wallet = await this.walletService.getWallet();
        localStorage.setItem('wallet', this.wallet);
        window.location.reload();
      });
    }

    if(localStorage.getItem('connected') === "true"){
      this.connected = true;
      this.walletService.getWallet().then((res: string) => {
        localStorage.setItem('wallet', res);
        this.wallet = res;
      });
    }
    this.getOwnBusiness();
  }

  getIdToRemove(idSelected: string){
    this.idToRemove = idSelected;
  } 

  async getOwnBusiness(){
    let wallet = localStorage.getItem('wallet');

    if(wallet && wallet != "0x0000000000000000000000000000000000000000"){
      this.ownBusiness =  (await this.businessService.getBusinessByWallet(wallet));
    }
  
    this.searchLoading = false;
  }

  async deleteBusiness(businessId: string){
    try {
      let res = await this.businessService.deleteBusiness(businessId);
      console.log(res);
      if(res.deleted){
        alert("Negocio eliminado correctamente");
        window.location.reload();
      }
    } catch (error: any) {
      console.log(error.response.data.deleted);
      if(!error.response.data.deleted){
        alert("Error al eliminar el negocio");
      }
    }
  }

  async editBusiness(business: Business){
    this.router.navigate(['registro', business]);
  }
}
