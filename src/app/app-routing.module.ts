import { Routes, RouterModule } from '@angular/router';
import { RecetasComponent } from './recetas/recetas.component';
import { InventarioModule } from './inventario/inventario.module';

const routes: Routes = [
  {
    path: 'recetas',
    loadChildren: () => import('./recetas/recetas.module').then(a => a.RecetasModule)
  },
  {
    path: 'inventario',
    loadChildren: () => import('./inventario/inventario.module').then(a => a.InventarioModule)
  },
  { path: '', pathMatch: 'full', redirectTo: 'recetas' }
];

export const appRoutes = RouterModule.forRoot(routes);

