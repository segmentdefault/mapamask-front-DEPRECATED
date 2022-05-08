import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Business } from '../interfaces/business.inteface';
import * as L  from 'leaflet';
import { BusinessService } from '../services/business.service';

import municipiosList from '../../assets/data/municipios.json';
import provinciasList from '../../assets/data/provincias.json';
@Component({
  selector: 'app-comercios',
  templateUrl: './comercios.component.html',
  styleUrls: ['./comercios.component.scss']
})

export class ComerciosComponent implements OnInit {
  width: any;

  business: Array<Business> = [];

  map: any;
  currentLatitude: string | null = "";
  currentLongitude: string | null = "";

  businessSearch: Array<Business> = [];

  cityInput: string = "Ciudad…";
  sectorInput: string = "Sector…";
  villageInput: string = "Pueblo…";
  keywordInput: string = "";

  villagesData: any = municipiosList;
  citiesData: any = provinciasList;

  searchLoading: boolean = false;

  info: string = "Aplica filtros para optimizar tu búsqueda, también puedes buscar sin usar ningún filtro y te mostraremos todos los negocios que se han dado de alta en nuestra plataforma";
  error: string = "";

  constructor(
    private router: Router,
    private businessService: BusinessService
  ) { }

  ngOnInit(): void {
    this.width = window.screen.width;
    this.business = this.businessService.business;
    /* this.currentLatitude = localStorage.getItem('currentLatitude');
    this.currentLongitude = localStorage.getItem('currentLongitude'); */
    this.setMap();
  }

  openRegister(){
    this.router.navigate(['/registro']);
  }

  searchBusiness(city?: string, keyword?: string, sector?: string){
    this.error = "";
    this.info = "";
    this.businessSearch = [];
    this.searchLoading = true;
    
    if(city == "Ciudad…" && sector == "Sector…" && !keyword){
      this.businessSearch = []

      document.getElementById("map")!.style.display = "flex";
      
    } else {
      document.getElementById("map")!.style.display = "none";
      this.business.forEach(item => {
        if(city && sector == "Sector…" && !keyword){
          if(item.city.toLowerCase() == city.toLowerCase()){
            this.businessSearch.push(item);
          }
        }
  
        if(city == "Ciudad…" && sector && !keyword){
          if(item.sector.toLowerCase() == sector.toLowerCase()){
            this.businessSearch.push(item);
          }
        }
  
        if(city && sector && !keyword){
          if(item.city.toLowerCase() == city.toLowerCase() && item.sector.toLowerCase() == sector.toLowerCase()){
            this.businessSearch.push(item);
          }
        }
  
        if(city == "Ciudad…" && sector == "Sector…" && keyword){
          let descriptionArray = item.description.split(" ");
          let nameArray = item.name.split(" ");
          let jobArray = item.job.split(" ");
  
          descriptionArray.forEach(word =>{
            if(word.toLowerCase() == keyword.toLowerCase()){
              this.businessSearch.push(item);
            }
          });
  
          nameArray.forEach(word =>{
            if(word.toLowerCase() == keyword.toLowerCase()){
              this.businessSearch.push(item);
            }
          });
  
          jobArray.forEach(word =>{
            if(word.toLowerCase() == keyword.toLowerCase()){
              this.businessSearch.push(item);
            }
          });
        }
  
        if(city && sector == "Sector…" && keyword){
  
          if(item.city.toLowerCase() == city.toLowerCase()){
            let descriptionArray = item.description.split(" ");
            let nameArray = item.name.split(" ");
            let jobArray = item.job.split(" ");
    
            descriptionArray.forEach(word =>{
              if(word.toLowerCase() == keyword.toLowerCase()){
                this.businessSearch.push(item);
              }
            });
    
            nameArray.forEach(word =>{
              if(word.toLowerCase() == keyword.toLowerCase()){
                this.businessSearch.push(item);
              }
            });
    
            jobArray.forEach(word =>{
              if(word.toLowerCase() == keyword.toLowerCase()){
                this.businessSearch.push(item);
              }
            });
          }
        }
  
        if(city == "Ciudad…" && sector && keyword){
  
          if(item.sector.toLowerCase() == sector.toLowerCase()){
            let descriptionArray = item.description.split(" ");
            let nameArray = item.name.split(" ");
            let jobArray = item.job.split(" ");
    
            descriptionArray.forEach(word =>{
              if(word.toLowerCase() == keyword.toLowerCase()){
                this.businessSearch.push(item);
              }
            });
    
            nameArray.forEach(word =>{
              if(word.toLowerCase() == keyword.toLowerCase()){
                this.businessSearch.push(item);
              }
            });
    
            jobArray.forEach(word =>{
              if(word.toLowerCase() == keyword.toLowerCase()){
                this.businessSearch.push(item);
              }
            });
          }
        }
  
        if(city && sector && keyword){
  
          if(item.sector.toLowerCase() == sector.toLowerCase() && item.city.toLowerCase() == city.toLowerCase()){
            let descriptionArray = item.description.split(" ");
            let nameArray = item.name.split(" ");
            let jobArray = item.job.split(" ");
    
            descriptionArray.forEach(word =>{
              if(word.toLowerCase() == keyword.toLowerCase()){
                this.businessSearch.push(item);
              }
            });
    
            nameArray.forEach(word =>{
              if(word.toLowerCase() == keyword.toLowerCase()){
                this.businessSearch.push(item);
              }
            });
    
            jobArray.forEach(word =>{
              if(word.toLowerCase() == keyword.toLowerCase()){
                this.businessSearch.push(item);
              }
            });
          }
        }
      });
  

      let index = 0;
      for (let i = 0; i < this.businessSearch.length; i++) {
        let indexTemporary = this.businessSearch[i].id;

        if(this.businessSearch[i].id == index){
          this.businessSearch.splice(i)
        }
        index = indexTemporary;
      }
  
      if(this.businessSearch.length == 0){
        this.error = "No se encontraron resultados";
      }
    }
    
    this.searchLoading = false;
  }

  setMap(){
   /*  if(this.currentLatitude && this.currentLongitude){
      this.map = L.map('map').setView([parseFloat(this.currentLatitude), parseFloat(this.currentLongitude)], 13);
    } else {
      this.map = L.map('map').setView([40.0619668, -2.1830444], 6);
    } */
    
    this.map = L.map('map').setView([40.0619668, -2.1830444], 6);
    var Jawg_Sunny = L.tileLayer('https://{s}.tile.jawg.io/jawg-sunny/{z}/{x}/{y}{r}.png?access-token={accessToken}', {
      attribution: '<a href="http://jawg.io" title="Tiles Courtesy of Jawg Maps" target="_blank">&copy; <b>Jawg</b>Maps</a> &copy; <a href="https://www.openstreetmap.org/copyright" target="_blank">OpenStreetMap</a> | <a href="https://www.cryptospace.es" target="_blank">CryptoSpace</a> contributors',
      minZoom: 0,
      maxZoom: 22,
      subdomains: 'abcd',
      accessToken: 'Q8ICYnDi0Fe2yGyJ2kORBlbMUu0ARufYhRjrRnoMvGXwDeluExCF3VmY3fmoQ4fs'
    });

    Jawg_Sunny.addTo(this.map);

    var metamaskIcon = L.icon({
      iconUrl: '../../assets/img/metamask-marker.png',
      iconSize: [45, 47]
    });

    this.business.forEach(item => {
      let popup = L.popup({
        closeButton: false
      }).setContent(`
        <p style="
          font-weight: bold;
          color: rgb(0, 0, 0);
          font-family: 'Montserrat';">${item.name}, ${item.job}
        </p>
        <a style="
          border-radius: 10px;
          border: 0;
          background-color: #f7911d;
          color: #ffffff;
          padding: 10px;
          text-decoration: none;"
          href='/comercio/${item.id}' target='_blank'>Ver ficha</a>
      `);

      let marker = L.marker([parseFloat(item.latitude), parseFloat(item.longitude)],{icon: metamaskIcon}).bindPopup(popup).openPopup();

      marker.addTo(this.map);
    });
  }
}

