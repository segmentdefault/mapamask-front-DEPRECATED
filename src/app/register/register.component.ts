import { Component, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import * as L  from 'leaflet';
import { Subscription } from 'rxjs';

import municipiosList from '../../assets/data/municipios.json';
import provinciasList from '../../assets/data/provincias.json';
import sectoresList from '../../assets/data/sectores.json';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  map: any;
  currentLatitude: string | null = "";
  currentLongitude: string | null = "";

  name: string = "";
  phone: string = "";
  email: string = "";
  web: string = "";
  sector: string = "";
  job: string = "";
  description: string = "";
  number: string = "6";
  street: string = "albors";
  cp: string = "12560";
  city: string = "Ciudad…";
  country: string = "españa";

  villagesData: any = municipiosList;
  citiesData: any = provinciasList;
  sectorsData: any = sectoresList;

  @ViewChild('modal', { read: ViewContainerRef })
  entry!: ViewContainerRef;
  sub!: Subscription;
  
  constructor() { }

  ngOnInit(): void {
    this.currentLatitude = localStorage.getItem('currentLatitude');
    this.currentLongitude = localStorage.getItem('currentLongitude');
    this.setMap();
  }

  ngOnDestroy(): void {
    if (this.sub) this.sub.unsubscribe();
  }

  sendRegisterRequest(){
    
  }

  async fillBBDD(){
    let API_URL = "http://localhost:8080/api/business/addBusiness";
    for (let i = 100; i < 400; i++) {
      let _datos = {
        "id": i,
        "name": "Santa comida",
        "images": ["../../assets/img/metamask-mapamask.jpg"],
        "email": "santacomida@cryptospace.es",
        "phone": "656748839",
        "description": "Local de comidas preparadas en castellón",
        "sector": "ocioRestauracion",
        "job": "Comidas preparadas",
        "latitude": "39.9808094",
        "longitude": "-0.0333288",
        "city": "Castellon",
        "web": "https://www.cryptospace.es",
        "rating": 3
      }

      await fetch(API_URL, {
        method: "POST",
        body: JSON.stringify(_datos),
        headers: {"Content-type": "application/json; charset=UTF-8"}
      })
    }
  }

  async showAtMap(number: string, street: string, cp: string, city: string, country: string){
    let streetArray = street.split(" ");
    let query: string = "";
    if(streetArray.length == 1){
      query = "https://api.mapbox.com/geocoding/v5/mapbox.places/" + number +"%20" + street +"%20" + cp + "%20"+ city + "%20" + country + ".json?access_token=pk.eyJ1IjoiYXNlcnJhbm8yMyIsImEiOiJjbDJrNmI4NGUwMGpiM2puazFwODgzczhqIn0.8u5Ay4jWQEvWYfYGYKoqfA";
    } else {
      let streetComplete: string = "";
      streetArray.forEach(item => {
        streetComplete +=  item + "%20";
      })
      
      query = "https://api.mapbox.com/geocoding/v5/mapbox.places/" + number +"%20" + streetComplete + cp + "%20"+ city + "%20" + country + ".json?access_token=pk.eyJ1IjoiYXNlcnJhbm8yMyIsImEiOiJjbDJrNmI4NGUwMGpiM2puazFwODgzczhqIn0.8u5Ay4jWQEvWYfYGYKoqfA";
    }
    
    let result = await fetch(query);
    let data = await result.json();

    let latitude = data.features[0].center[1];
    let longitude = data.features[0].center[0];

    this.setMarker(latitude, longitude);

    this.map.setView([latitude, longitude], 16);
  }

  setMarker(latitude: string, longitude: string){
    var marcador = L.marker([parseFloat(latitude), parseFloat(longitude)])
    marcador.bindPopup(`
      <p style="
        font-weight: bold;
        color: rgb(0, 0, 0);
        font-family: 'Montserrat';">Your location!
      </p>
      <p>
        ${latitude}, ${longitude}
      </p>
    `).openPopup();

    marcador.addTo(this.map);
  }

  setMap(){
    if(this.currentLatitude && this.currentLongitude){
      this.map = L.map('map').setView([parseFloat(this.currentLatitude), parseFloat(this.currentLongitude)], 13);
    } else {
      this.map = L.map('map').setView([39.981516, -0.032805], 13);
    }
    

    var Jawg_Sunny = L.tileLayer('https://{s}.tile.jawg.io/jawg-sunny/{z}/{x}/{y}{r}.png?access-token={accessToken}', {
      attribution: '<a href="http://jawg.io" title="Tiles Courtesy of Jawg Maps" target="_blank">&copy; <b>Jawg</b>Maps</a> &copy; <a href="https://www.openstreetmap.org/copyright" target="_blank">OpenStreetMap</a> | <a href="https://www.cryptospace.es" target="_blank">CryptoSpace</a> contributors',
      minZoom: 0,
      maxZoom: 22,
      subdomains: 'abcd',
      accessToken: 'Q8ICYnDi0Fe2yGyJ2kORBlbMUu0ARufYhRjrRnoMvGXwDeluExCF3VmY3fmoQ4fs'
    });

    Jawg_Sunny.addTo(this.map);

    let popup = L.popup({
      closeButton: false
    }).setContent(`
      <p style="
        font-weight: bold;
        color: rgb(53, 97, 218);
        font-family: 'Avenir Next LT Pro Regular';">CryptoSpace🚀<a target='_blank' href='https://cryptospace.es'>Conócenos</a>
      </p>
    `);

    let marker = L.marker([39.981516, -0.032805]).bindPopup(popup).openPopup();

    marker.addTo(this.map);
  }
  
}
