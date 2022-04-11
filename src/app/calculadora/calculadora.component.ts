import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-calculadora',
  templateUrl: './calculadora.component.html',
  styleUrls: ['./calculadora.component.scss']
})
export class CalculadoraComponent implements OnInit {

  fiat: string = "EUR";
  crypto: string = "BTC";
  resultCrypto: string = "";
  fiatAmount: string = "";
  constructor() { }

  ngOnInit(): void {
  }

}
