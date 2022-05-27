import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as L  from 'leaflet';
import { BusinessService } from '../services/business.service';

import municipiosList from '../../assets/data/municipios.json';
import provinciasList from '../../assets/data/provincias.json';
import sectoresList from '../../assets/data/sectores.json';
@Component({
  selector: 'app-comercios',
  templateUrl: './comercios.component.html',
  styleUrls: ['./comercios.component.scss']
})

export class ComerciosComponent implements OnInit {
  width: any;

  business: any;
  totalPages: number = 0;
  actualPage: number = 1;

  mapView: boolean = true;
  listView: boolean = false;

  markers: Array<any> = [];
  map: any;
  currentLatitude: string | null = "";
  currentLongitude: string | null = "";

  businessSearch: any;

  cityInput: string = "Ciudad…";
  sectorInput: string = "Sector…";
  villageInput: string = "Pueblo…";
  keywordInput: string = "";

  villagesData: any = municipiosList;
  citiesData: any = provinciasList;
  sectorsData: any = sectoresList;

  searchLoading: boolean = false;

  info: string = "Aplica filtros para optimizar tu búsqueda, también puedes buscar sin usar ningún filtro y te mostraremos todos los negocios";
  error: string = "";

  constructor(
    private router: Router,
    private businessService: BusinessService
  ) { }

  ngOnInit(): void {
    this.width = window.screen.width;
    
    this.mapView = true;
    this.listView = false;

    /* this.currentLatitude = localStorage.getItem('currentLatitude');
    this.currentLongitude = localStorage.getItem('currentLongitude'); */

    this.setMap();
  }

  async getInitialBusiness(){
    /* let businessPage = (await this.businessService.getBusinessByPage(1));
    this.business = businessPage.business;
    this.totalPages = businessPage.totalPages; */
    this.business = this.businessService.business;
  }

  openRegister(){
    this.router.navigate(['/registro']);
  }

  async nextPage(){
    /* let businessPage

    if(this.actualPage + 1 <= this.totalPages){
      let nextPage = this.actualPage + 1;
      this.actualPage = nextPage;
      console.log(nextPage);
      businessPage = (await this.businessService.getBusinessByPage(nextPage));
      this.totalPages = businessPage.totalPages;
      this.business = businessPage.business;

      this.removeMarkers();
      this.setMarkers();
    } */
  }

  async previousPage(){
    /* let businessPage

    if(this.actualPage - 1 > 0){
      let previousPage = this.actualPage - 1;
      this.actualPage = previousPage;
      console.log(previousPage);
      businessPage = (await this.businessService.getBusinessByPage(previousPage));
      this.totalPages = businessPage.totalPages;
      this.business = businessPage.business; 
      this.removeMarkers();
      this.setMarkers();
    } */
  }

  async goPage(page: number){
    /* this.searchLoading = true;

    this.actualPage = page;
    let businessPage = (await this.businessService.getBusinessByPage(page));
    this.totalPages = businessPage.totalPages;
    this.business = businessPage.business;

    this.removeMarkers();
    this.setMarkers();

    this.searchLoading = false; */
  }

  viewInList(){
    this.listView = true;
    this.mapView = false;
    document.getElementById("map")!.style.display = 'none';
  }

  viewInMap(){
    this.listView = false;
    this.mapView = true;
    document.getElementById("map")!.style.display = 'flex';
  }

  searchBusiness(city?: string, keyword?: string, sector?: string){
    this.error = "";
    this.info = "";
    this.businessSearch = [];
    this.searchLoading = true;
    
    /* if(city == "Ciudad…" && sector == "Sector…" && !keyword){
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
    } */
    
    this.searchLoading = false;
  }

  async setMap(){
   /*  if(this.currentLatitude && this.currentLongitude){
      this.map = L.map('map').setView([parseFloat(this.currentLatitude), parseFloat(this.currentLongitude)], 13);
    } else {
      this.map = L.map('map').setView([40.0619668, -2.1830444], 6);
    } */

    if(this.markers.length > 0){
      this.removeMarkers();
    }

    await this.getInitialBusiness();

    this.map = L.map('map').setView([40.0619668, -2.1830444], 6);
    var Jawg_Sunny = L.tileLayer('https://{s}.tile.jawg.io/jawg-sunny/{z}/{x}/{y}{r}.png?access-token={accessToken}', {
      attribution: '<a href="http://jawg.io" title="Tiles Courtesy of Jawg Maps" target="_blank">&copy; <b>Jawg</b>Maps</a> &copy; <a href="https://www.openstreetmap.org/copyright" target="_blank">OpenStreetMap</a> | <a href="https://www.cryptospace.es" target="_blank">CryptoSpace</a> contributors',
      minZoom: 0,
      maxZoom: 22,
      subdomains: 'abcd',
      accessToken: 'Q8ICYnDi0Fe2yGyJ2kORBlbMUu0ARufYhRjrRnoMvGXwDeluExCF3VmY3fmoQ4fs'
    });

    Jawg_Sunny.addTo(this.map);

    this.setMarkers();
  }

  setMarkers(){
    var metamaskIcon = L.icon({
      iconUrl: '../../assets/img/metamask-marker.png',
      iconSize: [45, 47]
    });

    this.business.forEach((item: { name: any; job: any; id: any; latitude: string; longitude: string; }) => {
      let popup = L.popup({
        closeButton: false
      }).setContent(`
        <p style="
          font-weight: bold;
          color: rgb(0, 0, 0);
          font-family: 'Montserrat';">${item.name}, ${item.job}, ${item.id}
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
      this.markers.push(marker);

      marker.addTo(this.map);
    });
  }

  removeMarkers(){
    this.markers.forEach((marker) => {
      this.map.removeLayer(marker);
    });

    this.markers = [];
  }

  counter(i: number) {
    return new Array(i);
  }
}

