import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InventarioComponent } from './inventario.component';


const testRoutes: Routes = [
  { path: '', component: InventarioComponent }
];

export const inventarioRouting = RouterModule.forChild(testRoutes);

