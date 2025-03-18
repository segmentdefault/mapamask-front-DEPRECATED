import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Business } from '../interfaces/business.inteface';
import axios from 'axios';
@Injectable({
  providedIn: 'root'
})
export class BusinessService {

  business: Array<Business> = [
    /* {
      id: 1,
      name: "Adrián Serrano",
      images: ["../../assets/img/metamask-mapamask.jpg"],
      email: "adrian@cryptospace.es",
      phone: "600206194",
      description: "Mi nombre es Adrián Serrano, soy programador blockchain, ofrezco servicios de desarrollo tanto en tecnología blockchain como en el ámbito de desarrollo web convencional",
      sector: "serviciosInformaticos",
      job: "Desarrollador web",
      latitude: "40.038272",
      longitude: "0.045783",
      city: "Castelló/Castellón",
      web: "https://www.cryptospace.es",
      rating: 5
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
      latitude: "40.4378698",
      longitude: "-3.8196217",
      city: "Madrid",
      web: "https://www.cryptospace.es",
      puntuacion: 5
    },
    {
      id: 3,
      name: "Panaderia/pastelería Juan Bello",
      image: "../../assets/img/pasteleria.png",
      email: "juanBello@cryptospace.es",
      phone: "6668777888",
      description: "La mejor panadería/pastelería de castellon",
      sector: "ocioRestauracion",
      job: "Panadería/Pastelería",
      latitude: "39.9815509",
      longitude: "-0.0354668",
      city: "Castelló/Castellón",
      web: "https://www.cryptospace.es",
      puntuacion: 4
    },
    {
      id: 4,
      name: "Santa comida",
      image: "../../assets/img/santa-comida.png",
      email: "santacomida@cryptospace.es",
      phone: "656748839",
      description: "Local de comidas preparadas en Castellón",
      sector: "ocioRestauracion",
      job: "Comidas preparadas",
      latitude: "39.9808094",
      longitude: "-0.0333288",
      city: "Castelló/Castellón",
      web: "https://www.cryptospace.es",
      puntuacion: 3
    } */
  ];

  constructor() { }

  async searchBusiness(sector?: string, keyword?: string){
    let searchBusinessEndPoint = environment.API_URL + "search";

    return (await axios.get(searchBusinessEndPoint, {
      params: {
        sector: sector,
        keyword: keyword
      }
    })).data;
  }

  async getAllBusiness(){
    return (await axios.get(environment.API_URL + "business")).data;
  }

  async getNumOfTotalBusiness(){
    let getNumOfBusinessEndpoint = environment.API_URL + "count";

    return (await axios.get(getNumOfBusinessEndpoint)).data;
  }

  async getBusinessByPage(page: number){
    let paginationEndpoint = environment.API_URL + "page?page="+page;

    return (await axios.get(paginationEndpoint)).data;
  }

  async addBusiness(business: Business){
    let addBusinessEndpoint = environment.API_URL + "addBusiness";

    return (await axios.post(addBusinessEndpoint, business)).data;
  }
  
  async getBusinessById(id: string): Promise<Business>{
    let getBusinessEndpoint = `${environment.API_URL}business/${id}`;
    return (await axios.get(getBusinessEndpoint)).data;
  }

  async deleteBusiness(businessId: string){
    let deleteBusinessEndpoint = `${environment.API_URL}deleteBusiness/${businessId}`;
    return (await axios.delete(deleteBusinessEndpoint)).data;
  }

  async editBusiness(businessEdited: Business){
    let editBusinessEndpoint = `${environment.API_URL}editBusiness/${businessEdited._id}`;
    return (await axios.post(editBusinessEndpoint, businessEdited)).data;
  }

  async getBusinessByWallet(walletToSearch: string){
    let searchBusinessEndPoint = `${environment.API_URL}/walletSearch/${walletToSearch}`;
    return (await axios.get(searchBusinessEndPoint)).data;

  }
}
