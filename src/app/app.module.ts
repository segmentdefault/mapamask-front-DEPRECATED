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
import { ModalComponent } from './modal/modal.component';

@NgModule({
  declarations: [
    AppComponent,
    ComerciosComponent,
    CalculadoraComponent,
    TutorialComponent,
    MetamaskComponent,
    RegisterComponent,
    ComercioComponent,
    ModalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
