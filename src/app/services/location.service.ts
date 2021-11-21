import { Injectable } from '@angular/core';
import { Location } from "../models/location";
@Injectable({
  providedIn: 'root'
})
export class LocationService {

  locations: Location[];

  constructor() { }



  getLocations(){
    if(localStorage.getItem('locations') === null){
      this.locations = [];

    }else{
      this.locations = JSON.parse(localStorage.getItem('locations'));
    }

    return this.locations;
  }


  addLocation(location:Location){

    let locations = [];
    if(localStorage.getItem('locations') === null){
      locations = [];
      locations.push(location);
      localStorage.setItem('locations',JSON.stringify(locations));

    }else{
      locations = JSON.parse(localStorage.getItem('locations'));
      locations.push(location);
      localStorage.setItem('locations',JSON.stringify(locations));
    }
  }




  deleteLocation(location:Location){
    for (let index = 0; index < this.locations.length; index++) {
      if(location == this.locations[index]){
        this.locations.splice(index,1);
        localStorage.setItem('locations',JSON.stringify(this.locations));
      }
      
    }
  }

}
