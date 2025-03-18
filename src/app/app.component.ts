import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { LangChangeEvent, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  langSelected: string = "";

  constructor(
    private translate: TranslateService,
    private title:Title){}

  ngOnInit(): void {
    this.translate.setDefaultLang('en');
    if(!localStorage.getItem('langSelected')){
      this.setAppLanguage();
    } else {
      this.langSelected = localStorage.getItem('langSelected')!;
      this.translate.use(this.langSelected);
    }

    this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
      this.translate.get('title').subscribe((res: string) => {
        this.title.setTitle(res);
      });
    });
  }

  setAppLanguage(){
    this.translate.use(this.translate.getBrowserLang()!);
    this.langSelected = this.translate.getBrowserLang()!;
  }

  reload(){
    window.location.reload();
  }

  changeLanguage(lang: string){
    this.langSelected = lang;
    localStorage.setItem('langSelected', lang.toLowerCase());
  }
  
}