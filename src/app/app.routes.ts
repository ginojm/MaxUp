import { Routes } from '@angular/router';
import { HomeComponent } from './home.component';
import { ModuleComponent } from './module.component';

export const routes: Routes = [
  { path: '', component: HomeComponent, title: 'MaxUp — Avec Max visé plus haut !' },
  { path: 'formations/:slug', component: ModuleComponent },
  { path: '**', redirectTo: '' },
];
