import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CalculadoraComponent } from './calculadora/calculadora.component';
import { ComerciosComponent } from './comercios/comercios.component';
import { HomeComponent } from './home/home.component';
import { MetamaskComponent } from './metamask/metamask.component';
import { TutorialComponent } from './tutorial/tutorial.component';

const routes: Routes = [
  {path: "home", component: HomeComponent},
  {path: "comercios", component: ComerciosComponent},
  {path: "calculadora", component: CalculadoraComponent},
  {path: "tutorial", component: TutorialComponent},
  {path: "metamask", component: MetamaskComponent},
  {path: "", pathMatch: "full", redirectTo: "home"},
  {path: "**", redirectTo: "home"}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
