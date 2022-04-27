import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Comercio } from '../interfaces/comercio.inteface';
import * as L  from 'leaflet';
import { GeoSearchControl, OpenStreetMapProvider } from 'leaflet-geosearch';
@Component({
  selector: 'app-comercios',
  templateUrl: './comercios.component.html',
  styleUrls: ['./comercios.component.scss']
})

export class ComerciosComponent implements OnInit {
  width: any;

  business: Array<Comercio> = [
    {
      id: 1,
      name: "Adrián Serrano",
      image: "../../assets/img/metamask-mapamask.jpg",
      email: "adrian@cryptospace.es",
      phone: "600206194",
      description: "Mi nombre es Adrián Serrano, soy programador blockchain, ofrezco servicios de desarrollo tanto en tecnología blockchain como en el ámbito de desarrollo web convencional",
      sector: "serviciosTecnicos",
      job: "Desarrollador web",
      latitude: "40.038272",
      longitude: "0.045783",
      city: "Castellon",
      web: "https://www.cryptospace.es",
      puntuacion: 5
    },
    {
      id: 2,
      name: "Camille de lemans",
      image: "../../assets/img/metamask-mapamask.jpg",
      email: "martin@cryptospace.es",
      phone: "666666666",
      description: "sastreria en madrid de trajes a medida",
      sector: "modaComplementos",
      job: "sastre",
      latitude: "40.038272",
      longitude: "0.045783",
      city: "Madrid",
      web: "https://www.cryptospace.es",
      puntuacion: 5
    },
    {
      id: 3,
      name: "Panaderia/pastelería Juan Bello",
      image: "../../assets/img/metamask-mapamask.jpg",
      email: "juanBello@cryptospace.es",
      phone: "6668777888",
      description: "La mejor panadería/pastelería de castellon",
      sector: "ocioRestauracion",
      job: "Panadería/Pastelería",
      latitude: "40.038272",
      longitude: "0.045783",
      city: "valencia",
      web: "https://www.cryptospace.es",
      puntuacion: 4
    },
    {
      id: 4,
      name: "Comidas preparadas",
      image: "../../assets/img/metamask-mapamask.jpg",
      email: "comidaspreparadas@cryptospace.es",
      phone: "656748839",
      description: "Local de comidas preparadas en castellón",
      sector: "ocioRestauracion",
      job: "Comidas preparadas",
      latitude: "40.038272",
      longitude: "0.045783",
      city: "Castellon",
      web: "https://www.cryptospace.es",
      puntuacion: 3
    }
  ];

  businessSearch: Array<Comercio> = [];

  cityInput: string = "";
  sectorInput: string = "";
  keywordInput: string = "";

  searchLoading: boolean = false;

  info: string = "Aplica filtros para optimizar tu búsqueda, también puedes buscar sin usar ningún filtro y te mostraremos todos los negocios que se han dado de alta en nuestra plataforma";
  error: string = "";
  status: string = "";

  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
    this.width = window.screen.width;

    //this.setMap();
  }

  setMap(){
    var map = L.map('map').setView([40, -0.04], 13);

    var Jawg_Sunny = L.tileLayer('https://{s}.tile.jawg.io/jawg-sunny/{z}/{x}/{y}{r}.png?access-token={accessToken}', {
      attribution: '<a href="http://jawg.io" title="Tiles Courtesy of Jawg Maps" target="_blank">&copy; <b>Jawg</b>Maps</a> &copy; <a href="https://www.openstreetmap.org/copyright" target="_blank">OpenStreetMap</a> | <a href="https://www.cryptospace.es" target="_blank">CryptoSpace</a> contributors',
      minZoom: 0,
      maxZoom: 22,
      subdomains: 'abcd',
      accessToken: 'Q8ICYnDi0Fe2yGyJ2kORBlbMUu0ARufYhRjrRnoMvGXwDeluExCF3VmY3fmoQ4fs'
    });

    Jawg_Sunny.addTo(map);

    for(let comercio of this.business){
      var marcador = L.marker([parseFloat(comercio.latitude), parseFloat(comercio.longitude)])
      marcador.bindPopup(`
        <p style="
          font-weight: bold;
          color: rgb(53, 97, 218);
          font-family: 'Avenir Next LT Pro Regular';">${comercio.name.toUpperCase()}(${comercio.city})
        </p>
      `).openPopup();

      marcador.addTo(map);
    }
  }

  openRegister(){
    this.router.navigate(['/registro']);
  }

  seeBusinessDetails(business: Comercio){
    localStorage.setItem("comercio", JSON.stringify(business));
    this.router.navigate(['/comercio', business.id]);
  }

  searchBusiness(city?: string, keyword?: string, sector?: string){
    this.status = "";
    this.error = "";
    this.info = "";
    this.businessSearch = [];
    this.searchLoading = true;
    
    if(!city && !sector && !keyword){
      this.status = "No has filtrado los resultados, a continuación te mostraremos todos los negocios que aceptan crypto";
      this.businessSearch = this.business;
    } else {
      this.business.forEach(item => {
        if(city && !sector && !keyword){
          if(item.city.toLowerCase() == city.toLowerCase()){
            this.businessSearch.push(item);
          }
        }
  
        if(!city && sector && !keyword){
          if(item.sector.toLowerCase() == sector.toLowerCase()){
            this.businessSearch.push(item);
          }
        }
  
        if(city && sector && !keyword){
          if(item.city.toLowerCase() == city.toLowerCase() && item.sector.toLowerCase() == sector.toLowerCase()){
            this.businessSearch.push(item);
          }
        }
  
        if(!city && !sector && keyword){
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
  
        if(city && !sector && keyword){
  
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
  
        if(!city && sector && keyword){
  
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
          this.businessSearch.splice(i,1);
        }
        
        index = indexTemporary;
      }
  
      if(this.businessSearch.length == 0){
        this.error = "No se encontraron resultados";
      }
    }
    
    this.searchLoading = false;
  }
}
