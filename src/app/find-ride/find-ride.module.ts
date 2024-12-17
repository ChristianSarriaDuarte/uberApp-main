import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { FindRidePageRoutingModule } from './find-ride-routing.module';
import { FindRidePage } from './find-ride.page';
import { MapComponent } from '../map/map.component';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule.forRoot(),
    FindRidePageRoutingModule
  ],
  declarations: [FindRidePage, MapComponent ],
  providers: [Geolocation], // Asegúrate de agregarlo aquí
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class FindRidePageModule {}
