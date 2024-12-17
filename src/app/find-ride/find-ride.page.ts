declare const google: any; // Agrega esto al principio del archivo

import { Component, OnInit } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation/ngx';

@Component({
  selector: 'app-find-ride',
  templateUrl: './find-ride.page.html',
  styleUrls: ['./find-ride.page.scss'],
})
export class FindRidePage implements OnInit {
  vehicles: any[] = []; // Lista de vehículos
  selectedVehicle: any; // Vehículo seleccionado

  constructor(private geolocation: Geolocation) {}

  ngOnInit() {
    this.loadGoogleMaps();
  }

  loadGoogleMaps() {
    const script = document.createElement('script');
    script.src = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyBcCOIuPah1ZOqIphr82m1YKsWXavLdyRE&libraries=places';
    script.onload = () => {
      console.log('Google Maps script loaded');
      this.loadMap(); // Carga el mapa una vez que el script se ha cargado
    };
    document.body.appendChild(script);
  }

  loadMap() {
    this.geolocation.getCurrentPosition().then((resp) => {
      if (typeof google !== 'undefined') {
        let latLng = new google.maps.LatLng(resp.coords.latitude, resp.coords.longitude);
        // Lógica para cargar el mapa utilizando latLng
      } else {
        console.error('Google Maps no está cargado');
      }
    }).catch((error) => {
      console.error('Error obteniendo la ubicación', error);
    });
  }

  onSubmit() {
    console.log('Formulario enviado', this.selectedVehicle);
    // Lógica para manejar el envío del formulario
  }

  selectVehicle(vehicle: any) {
    this.selectedVehicle = vehicle;
    console.log('Vehículo seleccionado', this.selectedVehicle);
  }

  // Otros métodos...
}
