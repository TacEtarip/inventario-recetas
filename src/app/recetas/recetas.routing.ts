import { Routes, RouterModule } from '@angular/router';
import { RecetasComponent } from './recetas.component';


const recetasRoutes: Routes = [
  { path: '', component: RecetasComponent }
];

export const recetasRouting = RouterModule.forChild(recetasRoutes);
