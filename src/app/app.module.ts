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

@NgModule({
  declarations: [
    AppComponent,
    ComerciosComponent,
    CalculadoraComponent,
    TutorialComponent,
    MetamaskComponent,
    RegisterComponent,
    ComercioComponent,
    SanitizeURLPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      // Register the ServiceWorker as soon as the application is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
