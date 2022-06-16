import { Component, OnInit } from '@angular/core';
import * as L  from 'leaflet';
import 'node_modules/leaflet-geosearch/dist/geosearch.css';
import municipiosList from '../../assets/data/municipios.json';
import provinciasList from '../../assets/data/provincias.json';
import sectoresList from '../../assets/data/sectores.json';
import countriesList from '../../assets/data/countries.json';
import { UtilsService } from '../services/utils.service';
import { Business } from '../interfaces/business.inteface';
import { BusinessService } from '../services/business.service';
import { ActivatedRoute, Router} from '@angular/router';
import * as ethers from 'ethers';

declare var window: any

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  map: any;
  markers: any[] = [];
  currentLatitude: string | null = "";
  currentLongitude: string | null = "";

  name: string = "";
  phone: string = "";
  email: string = "";
  web: string = "";
  indexes: Array<boolean> = [];
  sectors: Array<string> = [];
  job: string = "";
  description: string = "";
  number: string = "";
  street: string = "";
  images: string[] = [];
  cp: string = "";
  city: string = "";
  country: string = "País…*";
  latitude: string = "";
  longitude: string = "";
  onlineService: boolean = false;
  wallet: string = "0x0000000000000000000000000000000000000000";
  connected: boolean = false;

  villagesData: any = municipiosList;
  citiesData: any = provinciasList;
  sectorsData: any = sectoresList;
  countriesData: any = countriesList;

  buttonPlaceholder = "Selecciona tus sectores…*";
  
  status: string = "";

  businessToEdit: Business = {
    distance: 0,
    name: '',
    images: [],
    email: '',
    phone: '',
    description: '',
    sectors: [],
    job: '',
    latitude: '',
    longitude: '',
    city: '',
    country: '',
    web: '',
    online: false,
    owner: ''
  }
  hasBusinessToEdit: boolean = false;

  constructor(
    private utils: UtilsService,
    private businessService: BusinessService,
    private router: Router,
    private route: ActivatedRoute,) {  }

  ngOnInit(): void {
    this.getDataToEdit();
    
    this.currentLatitude = localStorage.getItem('currentLatitude');
    this.currentLongitude = localStorage.getItem('currentLongitude');

    window.ethereum.on('accountsChanged', () => {
      this.getWallet();
    });

    if(localStorage.getItem('connected') === "true"){
      this.connected = true;
      this.getWallet();
    }

    this.setMap();
  }

  getDataToEdit(){  
    if(this.route.snapshot.params['_id'] != undefined){
      this.hasBusinessToEdit = true;

      this.name = this.route.snapshot.params['name'];
      this.city = this.route.snapshot.params['city'];
      this.country = this.route.snapshot.params['country'];
      this.description = this.route.snapshot.params['description'];
      this.email = this.route.snapshot.params['email'];
      this.latitude = this.route.snapshot.params['latitude'];
      this.longitude = this.route.snapshot.params['longitude'];
      this.images[0] = this.route.snapshot.params['images'];
      this.job = this.route.snapshot.params['job'];
      this.onlineService = this.route.snapshot.params['online'];
      this.phone = this.route.snapshot.params['phone'];
      this.sectors = this.route.snapshot.params['sectors'];
      this.web = this.route.snapshot.params['web'];
    }
  }

  removeMarkers(){
    this.markers.forEach((marker) => {
      this.map.removeLayer(marker);
    });

    this.markers = [];
  }

  setMap(){

    var metamaskIcon = L.icon({
      iconUrl: '../../assets/img/mapamask-logo.png',
      iconSize: [45, 47]
    });

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

    this.map.on('click', (e: any) => {
      this.removeMarkers();

      var newMarker = L.marker(e.latlng, {icon: metamaskIcon}).addTo(this.map);

      this.latitude = e.latlng.lat;
      this.longitude = e.latlng.lng;

      this.markers.push(newMarker);
    });

    if(this.route.snapshot.params['_id'] != undefined){
      this.setMarker(this.route.snapshot.params['latitude'], this.route.snapshot.params['longitude']);
    }
  }

  async getWallet() {
    const provider = new ethers.providers.Web3Provider(window.ethereum, "any");
    const signer = provider.getSigner();
    this.wallet = await signer.getAddress();
  }

  async connectWallet(){
    const provider = new ethers.providers.Web3Provider(window.ethereum, "any");
    
    await provider.send("eth_requestAccounts", []);
    const signer = provider.getSigner();
    
    this.wallet = await signer.getAddress();
    this.connected = true;
    localStorage.setItem("connected", "true");
  }

  showBusiness(){
    localStorage.setItem('wallet', this.wallet);
    this.router.navigate(["/misNegocios"]);
  }

  saveImage(event: Event) {
    let files: any = event;
    
    for (let i = 0; i < files.target.files.length; i++) {
      let myReader:any = new FileReader();

      myReader.onloadend = (e: any) => {
        this.images[i] = myReader.result;
      }
      myReader.readAsDataURL(files.target.files[i]);
    }
  }

  async sendRegisterRequest(){
    this.status = "";
    
    if(this.name && this.email && this.sectors.length > 0 && this.city && this.country){
      if(this.hasBusinessToEdit){
        switch (true) {
          case (this.web.substring(0, 11) == "http://www."):
            break;
          case (this.web.substring(0, 7) == "http://"):
            this.web = "http://www." + this.web.substring(7);
            break;
          case (this.web.substring(0, 4) == "www."):
            this.web = "http://www." + this.web.substring(4);
            break;
          case (this.web.substring(0, 12) == "https://www."):
            this.web = "http://www." + this.web.substring(12);
            break;
          case (this.web.substring(0, 8) == "https://"):
            this.web = "http://www." + this.web.substring(8);
            break;
          default:
            this.web = "http://www." + this.web;
            break;
        }

        this.businessToEdit = {
          _id: this.route.snapshot.params['_id'],
          distance: this.route.snapshot.params['distance'],
          name: this.name,
          images: this.images,
          email: this.email,
          phone: this.phone,
          description: this.description,
          sectors: this.sectors,
          job: this.job,
          latitude: this.latitude,
          longitude: this.longitude,
          city: this.city,
          country: this.country,
          web: this.web,
          online: this.onlineService,
          owner: this.route.snapshot.params['owner']
        }

        let res = await (this.businessService.editBusiness(this.businessToEdit));
        
        if(res.acknowledged){
          alert("Tu negocio ha sido modificado correctamente");
          this.router.navigate(['/misNegocios']);
        } else {
          alert("Ha habido un error al modificar tu negocio, por favor, vuelve a intentarlo y si el error persiste, comunicate con nosotros.");
        }
      } else {
        if(this.web){
          switch (true) {
            case (this.web.substring(0, 11) == "http://www."):
              break;
            case (this.web.substring(0, 7) == "http://"):
              this.web = "http://www." + this.web.substring(7);
              break;
            case (this.web.substring(0, 4) == "www."):
              this.web = "http://www." + this.web.substring(4);
              break;
            case (this.web.substring(0, 12) == "https://www."):
              this.web = "http://www." + this.web.substring(12);
              break;
            case (this.web.substring(0, 8) == "https://"):
              this.web = "http://www." + this.web.substring(8);
              break;
            default:
              this.web = "http://www." + this.web;
              break;
          }
        }
        

        let newBusiness: Business = {
          distance: 0,
          name: this.name,
          images: this.images,
          email: this.email,
          phone: this.phone,
          description: this.description,
          sectors: this.sectors,
          job: this.job,
          latitude: this.latitude,
          longitude: this.longitude,
          city: this.city,
          country: this.country,
          web: this.web,
          online: this.onlineService,
          owner: this.wallet
        }
        

        let res = await (this.businessService.addBusiness(newBusiness));
        if(res.added){
          alert("Tu negocio ha sido añadido correctamente");
          this.router.navigate(['/comercios']);
        } else {
          alert("Ha habido un error al crear tu negocio, por favor, vuelve a intentarlo y si el error persiste, comunicate con nosotros.");
        }
      }      
    } else {
      this.status = "Por favor, rellena los campos obligatorios (*)";
    }
  }

  getCheckboxes(){
    if(!this.hasBusinessToEdit){
      this.sectors = [];
      for (let i = 0; i < this.indexes.length; i++) {
        if(this.indexes[i] == true){
          this.sectors.push(this.sectorsData[i].name)
        }
      }
      if(this.sectors.length > 0){
        this.buttonPlaceholder =  "Ver sectores seleccionados";
      } else {
        this.buttonPlaceholder =  "Selecciona tus sectores…*";
      }
    }
    
    
  }

  async showAtMap(number: string, street: string, cp: string, city: string, country: string){
    this.removeMarkers();
    this.markers = [];
    
    let coords = await this.utils.getCoords(city, country, number, street, cp);

    this.setMarker(coords.latitude, coords.longitude);
    this.latitude = coords.latitude.toString();
    this.longitude = coords.longitude.toString();
    this.map.flyTo([coords.latitude, coords.longitude], 16);
  }

  setMarker(latitude: number, longitude: number){
    var metamaskIcon = L.icon({
      iconUrl: '../../assets/img/mapamask-logo.png',
      iconSize: [45, 47]
    });
    var marcador = L.marker([latitude, longitude],{icon: metamaskIcon});

    this.markers.push(marcador);

    marcador.addTo(this.map);
  }
}
