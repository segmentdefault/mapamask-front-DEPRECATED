import { Component } from '@angular/core';
import { Coords } from 'leaflet';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Mapamask';

  ngOnInit(): void {
    if(!localStorage.getItem("currentLatitude") && !localStorage.getItem("currentLongitude")){
      this.getCurrentLocation();
    }
  }

  getCurrentLocation(){
    navigator.geolocation.getCurrentPosition(function(position){
      let latitude = position.coords.latitude;
      let longitude = position.coords.longitude;
      
      localStorage.setItem("currentLatitude", latitude.toString());
      localStorage.setItem("currentLongitude", longitude.toString());
    });
    window.location.reload();
  }
  
}
