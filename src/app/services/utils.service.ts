import { Injectable, Query } from '@angular/core';
import * as L  from 'leaflet';
import { Business } from '../interfaces/business.inteface';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  currentLatitude: number | null = 0;
  currentLongitude: number | null = 0;

  latitude: string = "";
  longitude: string = "";

  lat1: number = 0;
  lat2: number = 0;
  lon1: number = 0;
  lon2: number = 0;
  distance: string = "";

  constructor() { 
    this.currentLatitude = parseFloat(localStorage.getItem('currentLatitude')!);
    this.currentLongitude = parseFloat(localStorage.getItem('currentLongitude')!);
  }

  async getCoords(city: string, country: string, number?: string, street?: string, cp?: string){
    let query: string = "";
    if(street && number && cp){
      let streetArray = street.split(" ");
      
      if(streetArray.length == 1){
        query = "https://api.mapbox.com/geocoding/v5/mapbox.places/" + number +"%20" + street +"%20" + cp + "%20"+ city + "%20" + country + ".json?access_token=pk.eyJ1IjoiYXNlcnJhbm8yMyIsImEiOiJjbDJrNmI4NGUwMGpiM2puazFwODgzczhqIn0.8u5Ay4jWQEvWYfYGYKoqfA";
      } else {
        let streetComplete: string = "";
        streetArray.forEach(item => {
          streetComplete +=  item + "%20";
        })
        
        query = "https://api.mapbox.com/geocoding/v5/mapbox.places/" + number +"%20" + streetComplete +"%20" + cp + "%20"+ city + "%20" + country + ".json?access_token=pk.eyJ1IjoiYXNlcnJhbm8yMyIsImEiOiJjbDJrNmI4NGUwMGpiM2puazFwODgzczhqIn0.8u5Ay4jWQEvWYfYGYKoqfA";
      }
    } else {
      console.log("no street number & cp", city, country);
      query = "https://api.mapbox.com/geocoding/v5/mapbox.places/1%20principal%2012003%20" + city + "%20" + country + ".json?access_token=pk.eyJ1IjoiYXNlcnJhbm8yMyIsImEiOiJjbDJrNmI4NGUwMGpiM2puazFwODgzczhqIn0.8u5Ay4jWQEvWYfYGYKoqfA";
    }
    
    let result = await fetch(query);
    let data = await result.json();
    return {
      "latitude": parseFloat(data.features[0].center[1]),
      "longitude": parseFloat(data.features[0].center[0])
    }
  }

  getDistanceBetweenCoords(lat2: number, lon2: number){
    let lat1 = this.currentLatitude!;
    let lon1 = this.currentLongitude!;

    let rad = function (x: number) {
      return x * Math.PI / 180;
    }

    var R = 6378.137;//Radio de la tierra en km
    var dLat = rad(lat2 - lat1);
    var dLong = rad(lon2 - lon1);
    var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.cos(rad(lat1)) * Math.cos(rad(lat2)) * Math.sin(dLong / 2) * Math.sin(dLong / 2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c;
    return parseFloat(d.toFixed(2));//Retorna dos decimales
  }

  getAndSaveAllDistances(business: any){
    business.forEach((item: Business) => {
      item.distance = this.getDistanceBetweenCoords(parseFloat(item.latitude), parseFloat(item.longitude));
    });

    return business;
  }
}
