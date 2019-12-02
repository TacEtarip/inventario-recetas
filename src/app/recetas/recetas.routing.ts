import { Routes, RouterModule } from '@angular/router';
import { RecetasComponent } from './recetas.component';
import { RecetaCompletaComponent } from './receta-completa.component';


const recetasRoutes: Routes = [
  { path: '', component: RecetasComponent },
  { path: ':id-receta-nombre', component: RecetaCompletaComponent }
];

export const recetasRouting = RouterModule.forChild(recetasRoutes);
