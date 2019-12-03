import { Component, OnInit, Input } from '@angular/core';
import { RecetasService } from '../recetas.service';
import { ActivatedRoute } from '@angular/router';
import { InventarioService } from '../inventario.service';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-receta-completa',
  templateUrl: './receta-completa.component.html',
  styleUrls: ['./receta-completa.component.scss']
})
export class RecetaCompletaComponent implements OnInit {

  botonHecho$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);
  listaIngredientes$: BehaviorSubject<any[]> = new BehaviorSubject<any[]>(null);
  receta: any;
  temportal;
  ingredientesOpen = true;
  step = -1;
  localListIngredients = [];
  openIngredientes() {
    this.ingredientesOpen = true;
  }

  setStep(index: number) {
    this.step = index;
  }

  nextStep() {
    this.step++;
  }

  prevStep() {
    this.step--;
  }

  constructor(private inventario: InventarioService, private recetasService: RecetasService, private activatedRoute: ActivatedRoute) {
    this.activatedRoute.paramMap
      .subscribe(paramMap => {
        this.receta = this.recetasService
          .getReceta(paramMap.get('id-receta-nombre'));
      });

  }



  ngOnInit() {

    this.botonHecho$.next(!this.receta.listo);
    this.botonHecho$.subscribe((x) => { this.receta.listo = !x; });
    this.listaIngredientes$.next(this.inventario.listaIngredientes);
  }

  checkRecetaLista() {
    let contador = 0;
    this.receta.ingredientes.forEach(ingrediente => {
      const busqueda = this.listaIngredientes$.value.find(x => x.id === ingrediente.id);
      if (busqueda) {
        if (busqueda.cantidad >= ingrediente.cantidad_necesaria) {
          contador++;
        }
      }
    });
    if (contador === this.receta.ingredientes.length) {
      return true;
    }
    return false;
  }

  recetaRealizada() {
    this.listaIngredientes$.value.forEach(ingrediente => {
      const busquedaIndex = this.receta.ingredientes
        .findIndex(x => x.id === ingrediente.id);

      if (busquedaIndex !== -1) {
        const cantidadToReduce = this.receta.ingredientes[busquedaIndex].cantidad_necesaria;
        ingrediente.cantidad = ingrediente.cantidad - cantidadToReduce;
      }

    });
    this.botonHecho$.next(!this.checkRecetaLista());
    console.log(this.receta.listo);
    // this.botonHecho$.next();
    //  this.inventario.reduceInventario();
  }

  getCantidadIngredientes(index) {
    const busqueda = this.listaIngredientes$.value.find(x => x.id === this.receta.ingredientes[index].id);
    if (busqueda) {
      return busqueda.cantidad;
    }
    return 0;
  }

  haySuficientesIngredientes(index) {
    const busqueda = this.listaIngredientes$.value.find(x => x.id === this.receta.ingredientes[index].id);
    if (busqueda) {
      if (busqueda.cantidad >= this.receta.ingredientes[index].cantidad_necesaria) {
        return true;
      }
    }
    return false;
  }

  getNumberOfExtraIngredients() {
    if (this.receta.ingredientes_extra.length !== 0) {
      return true;
    }
    return false;
  }

}
