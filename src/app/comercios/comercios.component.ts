import { Component, OnInit, Sanitizer } from '@angular/core';
import { Router } from '@angular/router';
import * as L  from 'leaflet';
import 'leaflet.markercluster';
import 'leaflet-coordinates-control';
/* import 'L.Control.Coordinates.css'; */
import { BusinessService } from '../services/business.service';

import municipiosList from '../../assets/data/municipios.json';
import provinciasList from '../../assets/data/provincias.json';
import sectoresList from '../../assets/data/sectores.json';
import { UtilsService } from '../services/utils.service';
import { Business } from '../interfaces/business.inteface';
import { DomSanitizer, SafeResourceUrl, SafeUrl} from '@angular/platform-browser';
import { Position } from '../interfaces/position.interface';
import { Observable, Subject } from 'rxjs';
@Component({
  selector: 'app-comercios',
  templateUrl: './comercios.component.html',
  styleUrls: ['./comercios.component.scss']
})

export class ComerciosComponent implements OnInit {
  width: any;

  business: Array<Business> = [];
  totalPages: number = 0;
  actualPage: number = 1;

  mapView: boolean = true;
  listView: boolean = false;

  markers: Array<any> = [];
  markerCluster: any;
  map: any;
  currentLatitude: number = 0;
  currentLongitude: number = 0;

  businessSearch: any;

  cityInput: string = "Ciudad…";
  sectorInput: string = "Sector…";
  villageInput: string = "Pueblo…";
  keywordInput: string = "";

  villagesData: any = municipiosList;
  citiesData: any = provinciasList;
  sectorsData: any = sectoresList;

  searchLoading: boolean = true;

  error: string = "";

  constructor(
    private businessService: BusinessService,
    private utils: UtilsService,
    public sanitizer: DomSanitizer
  ) { }

  ngOnInit(): void {
    this.width = window.screen.width;
    
    this.mapView = true;
    this.listView = false;
    
    this.getCurrentPosition();
  }

  getCurrentPosition(){
    navigator.geolocation.getCurrentPosition(
      //SUCCESS
      async (position) => {
        this.currentLatitude = position.coords.latitude;
        this.currentLongitude = position.coords.longitude;
        await this.setMap();
    }, 
      //ERROR
      async (error) => {

        switch (true) {
          case error.code == 1:
            alert("No has aceptado acceder a tu geolocalización, algunas funciones de la página no funcionarán");
            break;
          case error.code == 2:
            alert("Posición no disponible en este momento");
            break;
          default:
            alert("Tiempo de espera consumido, vuelva a intentarlo");
            break;
        }
        
        await this.setMap();
    });
  }

  async getBusiness(){
    this.business = this.utils.getAndSaveAllDistances(await this.businessService.getAllBusiness(), this.currentLatitude, this.currentLongitude);
    this.orderBusinessByDistance();
  }

  orderBusinessByDistance(){
    if(this.currentLatitude != 0 && this.currentLongitude != 0){
      this.business.sort((a: Business,b: Business) => {
        if(a.distance < b.distance){
          return -1;
        }
  
        if(a.distance > b.distance){
          return 1;
        }
  
        return 0;
      })
    }
  }

  async nextPage(){
    let businessPage

    if(this.actualPage + 1 <= this.totalPages){
      let nextPage = this.actualPage + 1;
      this.actualPage = nextPage;
      businessPage = (await this.businessService.getBusinessByPage(nextPage));
      this.totalPages = businessPage.totalPages;
      this.business = businessPage.business;

      this.removeMarkers();
      this.setMarkers();
    }
  }

  async previousPage(){
    let businessPage

    if(this.actualPage - 1 > 0){
      let previousPage = this.actualPage - 1;
      this.actualPage = previousPage;
      businessPage = (await this.businessService.getBusinessByPage(previousPage));
      this.totalPages = businessPage.totalPages;
      this.business = businessPage.business; 
      this.removeMarkers();
      this.setMarkers();
    }
  }

  async goPage(page: number){
    this.searchLoading = true;

    this.actualPage = page;
    let businessPage = (await this.businessService.getBusinessByPage(page));
    this.totalPages = businessPage.totalPages;
    this.business = businessPage.business;

    this.removeMarkers();
    this.setMarkers();

    this.searchLoading = false;
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

  async searchBusiness(keyword?: string, sector?: string){
    this.removeMarkers();
    this.error = "";
    this.searchLoading = true;

    if(sector != "Sector…" || keyword){
      try {
        this.businessSearch = (await this.businessService.searchBusiness(sector, keyword));
       
        if(this.businessSearch.length > 0){
          this.business = this.businessSearch;
          this.utils.getAndSaveAllDistances(this.business, this.currentLatitude, this.currentLongitude);
          this.setMarkers();
          this.map.flyTo([this.currentLatitude, this.currentLongitude], 6);
        } else {
          this.viewInList();
          this.error = "Ningún negocio coincide con la búsqueda";
        }
        
      } catch (error) {
        console.log(error);
      }
    } else {
      await this.getBusiness();
      this.setMarkers();
      this.map.flyTo([this.currentLatitude, this.currentLongitude], 6);
    }

    this.searchLoading = false;
  }

  async setMap(){

    if(this.markers.length > 0){
      this.removeMarkers();
    }

    await this.getBusiness();
    
    this.searchLoading = false;

    if(this.currentLatitude && this.currentLongitude){
      this.map = L.map('map').setView([this.currentLatitude, this.currentLongitude], 6);
    } else {
      this.map = L.map('map').setView([40.0619668, -2.1830444], 18);
    }
    
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
    this.markerCluster = L.markerClusterGroup();
    var metamaskIcon = L.icon({
      iconUrl: '../../assets/img/mapamask-logo.png',
      iconSize: [45, 47]
    });

    this.business.forEach((item: Business) => {
      if(item.latitude && item.longitude){
        let popup = L.popup({
          closeButton: false
        }).setContent(`
          <div class="row">
            <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-sm-12 col-12">
              <h5 style="font-weight: bold; color: rgb(0, 0, 0); font-family: 'Montserrat';">
                ${item.name}, ${item.job}
              </h5>
            </div>
          </div>
          
          <div class="row">
            <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-sm-6 col-6 end-vertically">
              <h6 style="font-weight: bold; color: rgb(0, 0, 0); font-family: 'Montserrat';">
                ${item.distance}Km
              </h6>
            </div>
            <div class="col-xl-3 col-lg-3 col-md-3 col-sm-3 col-sm-3 col-3 end">
              <a style="
                border-radius: 10px;
                border: 0;
                background-color: #f7911d;
                color: #ffffff;
                padding: 5px;
                text-decoration: none;"
                href='https://www.google.com/maps/dir/${this.currentLatitude},${this.currentLongitude}/${item.latitude},${item.longitude}' target='_blank'><i class="fa-solid fa-diamond-turn-right fa-xl"></i></a>
            </div>
            <div class="col-xl-3 col-lg-3 col-md-3 col-sm-3 col-sm-3 col-3 end">
              <a style="
                border-radius: 10px;
                border: 0;
                text-decoration: none;
                margin-left: 5px;"
                href='https://www.google.com/search?q=${item.name}+${item.city}' target='_blank'><img style='width: 30px;' src="../../assets/img/google-logo.png" alt="google logo"></a>
            </div>
          </div>
          
        `);
        
        
  
        let marker = L.marker([parseFloat(item.latitude), parseFloat(item.longitude)],{icon: metamaskIcon}).bindPopup(popup).openPopup();
        this.markers.push(marker);
  
        this.markerCluster.addLayer(marker);
        this.map.addLayer(this.markerCluster);
      }
    });
  }

  removeMarkers(){
    
    this.markers.forEach((marker) => {
      this.markerCluster.removeLayer(marker);
      this.map.removeLayer(marker);
    });

    this.markers = [];
  }

  counter(i: number) {
    return new Array(i);
  }
}

