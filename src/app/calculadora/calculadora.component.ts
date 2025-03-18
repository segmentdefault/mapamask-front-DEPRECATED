import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-calculadora',
  templateUrl: './calculadora.component.html',
  styleUrls: ['./calculadora.component.scss']
})
export class CalculadoraComponent implements OnInit {

  baseApiUrl: string = "https://api.binance.com/api/v3/";
  getPriceEndpoint: string = "ticker/price?symbol=";

  fiat: string = "EUR";
  crypto: string = "BTC";
  resultCrypto: string = "";
  fiatAmount: string = "";

  eurPrice: string = "";

  constructor() { }

  ngOnInit(): void {
    document.getElementById('fiatAmount')?.addEventListener('keyup', async () => {
      if(this.fiatAmount != ""){
        if(this.fiat == "EUR"){
          await this.getPriceInEUR();
        } else {
          await this.getPriceInUSD();
        }

        await this.getPriceEach30Secs();
      }
    });

    document.getElementById('fiat')?.addEventListener('change', async () => {
      if(this.fiatAmount != ""){
        if(this.fiat == "EUR"){
          await this.getPriceInEUR();
        } else {
          await this.getPriceInUSD();
        }

        await this.getPriceEach30Secs();
      }
    });

    document.getElementById('crypto')?.addEventListener('change', async () => {
      if(this.fiatAmount != ""){
        if(this.fiat == "EUR"){
          await this.getPriceInEUR();
        } else {
          await this.getPriceInUSD();
        }

        await this.getPriceEach30Secs();
      }
    });
  }

  async getEurPrice(){
    let apiUrlPrice: string = this.baseApiUrl + this.getPriceEndpoint + "EURUSDT";
    let result = await fetch(apiUrlPrice);
    let data = await result.json();
    this.eurPrice = data.price;
  }

  async getPriceInEUR(){
    if(this.eurPrice == "") {
      await this.getEurPrice();
    }

    if(this.crypto == "USDT"){
      this.resultCrypto = "Loading…";
      let apiUrlPrice: string = this.baseApiUrl + this.getPriceEndpoint + "EURUSDT";
      let result = await fetch(apiUrlPrice);
      let data = await result.json();
      let price = data.price;

      this.resultCrypto = (parseFloat(this.fiatAmount) * (1 * price)).toString();

    } else {

      this.resultCrypto = "Loading…";
      let apiUrlPrice: string = this.baseApiUrl + this.getPriceEndpoint + this.crypto + "USDT";
      let result = await fetch(apiUrlPrice);
      let data = await result.json();
      let price = data.price;
  
      let cryptoInEur = price / parseFloat(this.eurPrice);
      this.resultCrypto = (parseFloat(this.fiatAmount) / cryptoInEur).toFixed(6).toString();
    }
  }

  async getPriceInUSD(){
    if(this.crypto == "USDT"){
      this.resultCrypto = this.fiatAmount;

    } else {

      this.resultCrypto = "Loading…";
      let apiUrlPrice: string = this.baseApiUrl + this.getPriceEndpoint + this.crypto + "USDT";
      let result = await fetch(apiUrlPrice);
      let data = await result.json();
      let price = data.price;

      this.resultCrypto = (parseFloat(this.fiatAmount) / price).toFixed(6).toString();
    }
    
  }

  async getPriceEach30Secs(){
    if(this.eurPrice == "") {
      await this.getEurPrice();
    }

    setInterval(async ()=> {
      if(this.fiat == "EUR"){
        await this.getPriceInEUR();
      } else {
        await this.getPriceInUSD();
      }
    }, 30000)
  }
}
