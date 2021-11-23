import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


import { HomeComponent } from './home/home.component';
import { MapaComponent } from './mapa/mapa.component';


const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'mapa', component: MapaComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
