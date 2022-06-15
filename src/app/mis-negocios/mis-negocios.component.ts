import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Business } from '../interfaces/business.inteface';
import { BusinessService } from '../services/business.service';

@Component({
  selector: 'app-mis-negocios',
  templateUrl: './mis-negocios.component.html',
  styleUrls: ['./mis-negocios.component.scss']
})
export class MisNegociosComponent implements OnInit {

  wallet: string = "";
  ownBusiness: Array<any> = [];
  searchLoading: boolean = true;
  idToRemove: string = "0";

  constructor(
    private businessService: BusinessService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.wallet = localStorage.getItem('wallet')!;
    this.getOwnBusiness();
  }

  getIdToRemove(idSelected: string){
    this.idToRemove = idSelected;
  } 

  async getOwnBusiness(){
    this.ownBusiness =  (await this.businessService.getBusinessByWallet(this.wallet));
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
