import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ComerciosComponent } from './comercios/comercios.component';
import { CalculadoraComponent } from './calculadora/calculadora.component';
import { TutorialComponent } from './tutorial/tutorial.component';
import { MetamaskComponent } from './metamask/metamask.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { RegisterComponent } from './register/register.component';
import { ComercioComponent } from './comercio/comercio.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { SanitizeURLPipe } from './pipes/sanitize-url.pipe';
import { MisNegociosComponent } from './mis-negocios/mis-negocios.component';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from './shared/shared.module';

export function HttpLoaderFactory(http:HttpClient) {
  return new TranslateHttpLoader(http, "../assets/i18n/", ".json");
}
@NgModule({
  declarations: [
    AppComponent,
    ComerciosComponent,
    CalculadoraComponent,
    TutorialComponent,
    MetamaskComponent,
    RegisterComponent,
    ComercioComponent,
    SanitizeURLPipe,
    MisNegociosComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      // Register the ServiceWorker as soon as the application is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    }),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps:[HttpClient]
      }
    }),
    SharedModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
