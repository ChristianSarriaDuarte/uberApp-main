import { Component, OnInit } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation/ngx';

declare var google: any;

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent implements OnInit {
  map: any;
  directionsService: any;  // Declarar la propiedad directionsService
  directionsRenderer: any; // Declarar la propiedad directionsRenderer
  distance: string = '';
  duration: string = '';
  cost: number | null = null;
  origin: string = ''; // Añadir las propiedades origin y destination
  destination: string = '';

  constructor(private geolocation: Geolocation) {}

  ngOnInit() {
    this.loadMap();
  }

  loadMap() {
    this.geolocation
      .getCurrentPosition()
      .then((position) => {
        const latLng = new google.maps.LatLng(
          position.coords.latitude,
          position.coords.longitude
        );
        const mapOptions = {
          center: latLng,
          zoom: 15,
          mapTypeId: google.maps.MapTypeId.ROADMAP,
        };
        this.map = new google.maps.Map(
          document.getElementById('map'),
          mapOptions
        );

        // Crear un marcador en la ubicación actual
        new google.maps.Marker({
          position: latLng,
          map: this.map,
          title: 'Tú estás aquí!',
        });

        // Inicializar DirectionsService y DirectionsRenderer
        this.directionsService = new google.maps.DirectionsService();
        this.directionsRenderer = new google.maps.DirectionsRenderer();
        this.directionsRenderer.setMap(this.map);
      })
      .catch((error) => {
        console.log('Error getting location', error);
      });
  }

  // Método para calcular una ruta
  calculateRoute() {
    if (this.origin && this.destination) {
      const request = {
        origin: this.origin,
        destination: this.destination,
        travelMode: google.maps.TravelMode.DRIVING, // Puedes cambiar a WALKING, BICYCLING, etc.
      };

      this.directionsService.route(request, (result: any, status: string) => {
        if (status === google.maps.DirectionsStatus.OK) {
          this.directionsRenderer.setDirections(result);

          // Obtener distancia y tiempo
          const route = result.routes[0].legs[0];
          this.distance = route.distance.text;
          this.duration = route.duration.text;

          // Calcular un costo estimado por kilómetro
          const distanceValue = route.distance.value / 1000; // Convertir a kilómetros
          const costPerKm = 2; // Define tu costo por kilómetro
          this.cost = distanceValue * costPerKm;
        } else {
          console.error('No se pudo calcular la ruta:', status);
          alert('No se pudo calcular la ruta. Verifica los datos ingresados.');
        }
      });
    } else {
      alert('Por favor ingresa una dirección de origen y destino.');
    }
  }
}
