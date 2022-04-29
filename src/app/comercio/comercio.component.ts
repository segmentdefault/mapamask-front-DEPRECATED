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
      image: "",
      email: "",
      phone: "",
      description: "",
      sector: "",
      job: "",
      latitude: "",
      longitude: "",
      city: "",
      web: "",
      puntuacion: 0
  }
  
  constructor(
    private route: ActivatedRoute,
    private businessService: BusinessService
  ) { }

  ngOnInit(): void {
    if(this.businessService.getBusinessById(this.businessId).id != 0){
      this.business = this.businessService.getBusinessById(this.businessId);
    } else {
      this.error = "Business not found";
    }
  }

}
