import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
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

  constructor(private translate: TranslateService){
    this.setAppLanguaje();
  }

  ngOnInit(): void {
  }

  setAppLanguaje(){
    this.translate.setDefaultLang('en');
    this.translate.use(this.translate.getBrowserLang()!);
  }
  
}