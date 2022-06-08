import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Position } from './interfaces/position.interface';
import { UtilsService } from './services/utils.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Mapamask';

  constructor(){}

  ngOnInit(): void {
  }
  
}