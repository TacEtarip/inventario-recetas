import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecetasComponent } from './recetas.component';
import { RecetaCompletaComponent } from './receta-completa.component';
import { ReactiveFormsModule } from '@angular/forms';

import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';

import { recetasRouting } from './recetas.routing';

@NgModule({
  declarations: [
    RecetasComponent,
    RecetaCompletaComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatButtonToggleModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    recetasRouting,
    MatButtonModule,
    MatExpansionModule,
    MatListModule,
    MatMenuModule
  ]
})
export class RecetasModule { }
