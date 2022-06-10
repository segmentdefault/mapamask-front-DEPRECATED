import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Business } from '../interfaces/business.inteface';
import { BusinessService } from '../services/business.service';

@Component({
  selector: 'app-comercio',
  templateUrl: './comercio.component.html',
  styleUrls: ['./comercio.component.scss']
})
export class ComercioComponent implements OnInit {

  error: string = "";
  businessId: number = this.route.snapshot.params['id'];
  business: Business = {
      id: 0,
      name: "",
      images: [],
      email: "",
      phone: "",
      description: "",
      sectors: [],
      job: "",
      latitude: "",
      longitude: "",
      city: "",
      country: "",
      web: "",
      rating: 0,
      online: false,
      distance: 0,
      owner: "0x0000000000000000000000000000000000000000"
  }
  
  constructor(
    private route: ActivatedRoute,
    private businessService: BusinessService
  ) { }

  ngOnInit(): void {
    this.getBusinessData();
  }

  async getBusinessData(){
    try {
      this.business = (await this.businessService.getBusinessById(this.businessId));
      if(!this.business.images[0]){
        this.business.images[0] = "../../assets/img/metamask-mapamask.jpg";
      }
    } catch (error) {
      this.error = "Business not found";
    }
  }

}
