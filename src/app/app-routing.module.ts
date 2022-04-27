import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CalculadoraComponent } from './calculadora/calculadora.component';
import { ComercioComponent } from './comercio/comercio.component';
import { ComerciosComponent } from './comercios/comercios.component';
import { MetamaskComponent } from './metamask/metamask.component';
import { RegisterComponent } from './register/register.component';
import { TutorialComponent } from './tutorial/tutorial.component';

const routes: Routes = [
  {path: "comercios", component: ComerciosComponent},
  {path: "comercio/:id", component: ComercioComponent},
  {path: "registro", component: RegisterComponent},
  {path: "calculadora", component: CalculadoraComponent},
  {path: "tutorial", component: TutorialComponent},
  {path: "metamask", component: MetamaskComponent},
  {path: "", pathMatch: "full", redirectTo: "comercios"},
  {path: "**", redirectTo: "comercios"}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
