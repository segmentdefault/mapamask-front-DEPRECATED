import { Injectable, Query } from '@angular/core';
import * as L from 'leaflet';
import { Observable, Subject } from 'rxjs';
import { Business } from '../interfaces/business.inteface';
import { Position } from '../interfaces/position.interface';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  constructor() { }

  async getCoords(city: string, country: string, number?: string, street?: string, cp?: string) {
    let query: string = "";
    if (street && number && cp) {
      let streetArray = street.split(" ");

      if (streetArray.length == 1) {
        query = "https://api.mapbox.com/geocoding/v5/mapbox.places/" + number + "%20" + street + "%20" + cp + "%20" + city + "%20" + country + ".json?access_token=pk.eyJ1IjoiYXNlcnJhbm8yMyIsImEiOiJjbDJrNmI4NGUwMGpiM2puazFwODgzczhqIn0.8u5Ay4jWQEvWYfYGYKoqfA";
      } else {
        let streetComplete: string = "";
        streetArray.forEach(item => {
          streetComplete += item + "%20";
        })

        query = "https://api.mapbox.com/geocoding/v5/mapbox.places/" + number + "%20" + streetComplete + "%20" + cp + "%20" + city + "%20" + country + ".json?access_token=pk.eyJ1IjoiYXNlcnJhbm8yMyIsImEiOiJjbDJrNmI4NGUwMGpiM2puazFwODgzczhqIn0.8u5Ay4jWQEvWYfYGYKoqfA";
      }
    } else {
      console.log("no street number & cp", city, country);
      query = "https://api.mapbox.com/geocoding/v5/mapbox.places/1%20principal%2012003%20" + city + "%20" + country + ".json?access_token=pk.eyJ1IjoiYXNlcnJhbm8yMyIsImEiOiJjbDJrNmI4NGUwMGpiM2puazFwODgzczhqIn0.8u5Ay4jWQEvWYfYGYKoqfA";
    }
    console.log(query);
    let result = await fetch(query);
    let data = await result.json();
    return {
      "latitude": parseFloat(data.features[0].center[1]),
      "longitude": parseFloat(data.features[0].center[0])
    }
  }

  getDistanceBetweenCoords(lat2: number, lon2: number, userLatitude: number, userLongitude: number) {

    if (userLatitude != 0 && userLongitude != 0) {
      let rad = function (x: number) {
        return x * Math.PI / 180;
      }

      var R = 6378.137;//Radio de la tierra en km
      var dLat = rad(lat2 - userLatitude);
      var dLong = rad(lon2 - userLongitude);
      var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.cos(rad(userLatitude)) * Math.cos(rad(lat2)) * Math.sin(dLong / 2) * Math.sin(dLong / 2);
      var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
      var d = R * c;
      return parseFloat(d.toFixed(2));
    } else {
      return -1;
    }

  }

  getAndSaveAllDistances(business: any, currentLatitude: number, currentLongitude: number) {
    business.forEach((item: Business) => {
      item.distance = this.getDistanceBetweenCoords(parseFloat(item.latitude), parseFloat(item.longitude), currentLatitude, currentLongitude);
    });

    return business;
  }

  orderBusinessByDistance(business: Business[], currentLatitude: number, currentLongitude: number) {
    if (currentLatitude != 0 && currentLongitude != 0) {

      business.sort(function (a, b) {
        return a.distance.toString().localeCompare(b.distance.toString(), undefined, { 'numeric': true });
      })
      return business;
    }
    return business;
  }
}
