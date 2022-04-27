import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Comercio } from '../interfaces/comercio.inteface';

@Component({
  selector: 'app-comercio',
  templateUrl: './comercio.component.html',
  styleUrls: ['./comercio.component.scss']
})
export class ComercioComponent implements OnInit {

  comercioId: number = this.route.snapshot.params['id'];
  comercio: Comercio = {
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
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    let comercio: string | null = localStorage.getItem('comercio');
    
    if(comercio){
      this.comercio = JSON.parse(comercio);
    }
  }

}
