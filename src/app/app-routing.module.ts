import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';



import { MapaComponent } from "./mapa/mapa.component"; // <---
import { HomeComponent } from "./home/home.component"; // <---
import { AdminComponent } from "./admin/admin.component"; // <---
import { ComunicateComponent } from "./comunicate/comunicate.component"; // <---
const routes: Routes = [
  { path: "home", component: HomeComponent },
  { path: "admin", component: AdminComponent },
  { path: "comunicate", component: ComunicateComponent }  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
