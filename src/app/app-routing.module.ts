import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'inicio',
    loadChildren: () => import('./inicio/inicio.module').then( m => m.InicioPageModule)
  },
  {
    path: 'uber-front',
    loadChildren: () => import('./uber-front/uber-front.module').then( m => m.UberFrontPageModule)
  },
  {
    path: 'become-driver',
    loadChildren: () => import('./become-driver/become-driver.module').then( m => m.BecomeDriverPageModule)
  },
  {
    path: 'nosotros',
    loadChildren: () => import('./nosotros/nosotros.module').then( m => m.NosotrosPageModule)
  },
  {
    path: 'register-driver',
    loadChildren: () => import('./register-driver/register-driver.module').then( m => m.RegisterDriverPageModule)
  },
  {
    path: 'find-ride',
    loadChildren: () => import('./find-ride/find-ride.module').then( m => m.FindRidePageModule)
  },
  {
    path: 'map',
    loadChildren: () => import('./map/map.component').then( m => m.MapComponent)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
