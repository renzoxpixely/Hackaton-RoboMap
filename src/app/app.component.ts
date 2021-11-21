import { Component, OnInit, ChangeDetectorRef, NgZone, ViewChild, ElementRef } from '@angular/core';
import { MapsAPILoader} from '@agm/core';
import { LocationService } from './services/location.service';
import { Location } from "./models/location";
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {


 public teams: any[] = [
    { name: 'ROBO' },
    { name: 'ACOSO' },
    { name: 'ESTAFA' },
    { name: 'HOMICIDIO' },
    { name: 'LESIONES' },
    { name: 'SECUESTRO' },
    { name: 'VIOLACIÓN' },
];

  public selectedItem: string;


  public latAca = -12.0453
  public lngAca =-77.0311
  public zoom =11;
  private geoCoder;
  public address: string;
  title = 'Mapas de GOOGLE con Angular';
  public iconmarker = 'assets/crimen.png'
  public locations: any = [];

  public page = 1;
  public pageSize = 4;



@ViewChild('search')
public searchElementRef: ElementRef;
constructor(private mapsAPILoader: MapsAPILoader,private ngZone: NgZone,private locationService:LocationService){
  
}

  ngOnInit(): void {
    
    this.mapsAPILoader.load().then(() => {
      
      this.geoCoder = new google.maps.Geocoder;
      let autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement);
      autocomplete.addListener("place_changed", () => {
        this.ngZone.run(() => {

          let place: google.maps.places.PlaceResult = autocomplete.getPlace();

          if (place.geometry === undefined || place.geometry === null) {
            return;
          }


          this.latAca = place.geometry.location.lat();
          this.lngAca= place.geometry.location.lng();
          this.zoom = 12;
          this.obtener_direccion(this.latAca,this.lngAca)

        });
      });
    });

    this.locations = this.locationService.getLocations();

    
    
  }




addMarker($event){
  this.latAca = $event.coords.lat;
  this.lngAca = $event.coords.lng;
  console.log(this.latAca,this.lngAca);
  this.obtener_direccion(this.latAca,this.lngAca)


  
}

dragMarker($event) {
  this.latAca = $event.coords.lat;
  this.lngAca = $event.coords.lng;
  console.log(this.latAca,this.lngAca);
  this.obtener_direccion(this.latAca,this.lngAca)
  
}


obtener_direccion(latitude, longitude) {
  this.geoCoder.geocode({ 'location': { lat: latitude, lng: longitude } }, (results, status) => {
    console.log(results);
    if (status === 'OK') {
      if (results[0]) {
        this.zoom = 12;
        this.address = results[0].formatted_address;
      } else {
        window.alert('Sin resultados');
      }
    } else {
      window.alert(status);
    }

  });
}

addLocation(){
  this.locationService.addLocation({
    address: this.address,
    latitud: this.latAca,
    longtiud: this.lngAca,
    delito: this.selectedItem
  });

  this.locations = this.locationService.getLocations();
}

deleteLocation(location:Location){
  if(confirm('Quieres eliminar esta locación?')){
    this.locationService.deleteLocation(location);
  }
}

selectLocation(location:Location){

  this.address = location.address;
  this.lngAca = location.longtiud;
  this.latAca = location.latitud;


}

}



