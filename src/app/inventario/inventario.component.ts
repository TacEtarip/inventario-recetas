import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl, FormBuilder } from '@angular/forms';
import { fromEvent, BehaviorSubject, concat, from } from 'rxjs';
import { map, debounceTime, pluck, distinctUntilChanged } from 'rxjs/operators';
import { InventarioService } from '../inventario.service';

@Component({
  selector: 'app-inventario',
  templateUrl: './inventario.component.html',
  styleUrls: ['./inventario.component.scss']
})
export class InventarioComponent implements OnInit {

  menuOpc = [];

  menuActivo = 'Todas';

  form: FormGroup;

  ingredientes = [];

  listaInventarioCompleto = [{
    nombreLista: 'Frutas',
    lista: []
  }, {
    nombreLista: 'Verduras',
    lista: []
  }, {
    nombreLista: 'Carnes',
    lista: []
  },
  {
    nombreLista: 'Otros',
    lista: []
  }];


  ingredientes$: BehaviorSubject<any[]> = new BehaviorSubject<any[]>(null);

  constructor(private inventario: InventarioService, private formBuilder: FormBuilder) { }

  ngOnInit() {

    this.menuOpc.push('Todas');
    this.listaInventarioCompleto.forEach(element => {
      this.menuOpc.push(element.nombreLista);
    });
    this.ingredientes$.next(this.inventario.listaIngredientes);
    this.ingredientes$.subscribe(() => {
      this.addToList();
    });
  }

  ejecutarAdicion(index, item) {
    this.listaInventarioCompleto[index].lista.push(item);
    this.listaInventarioCompleto[index].lista.sort((a, b) => (a.nombre > b.nombre) ? 1 : -1);
  }

  addToList() {
    this.ingredientes$.value.forEach(item => {
      switch (item.categoria) {
        case 'Frutas':
          this.ejecutarAdicion(0, item);
          break;
        case 'Verduras':
          this.ejecutarAdicion(1, item);
          break;
        case 'Carnes':
          this.ejecutarAdicion(2, item);
          break;
        default:
          this.ejecutarAdicion(3, item);
          break;
      }
    });
  }

  cambiarShow(index) {

    /*if (this.menuOpc[index] === 'Todas') {
      this.listaActual = this.recetasLista;
      this.recetasListaBH$.next(this.recetasLista);
    } else if (this.menuOpc[index] === 'Listas') {
      this.listaActual = this.recetasYaListas;
      this.recetasListaBH$.next(this.recetasYaListas);
    } else {
      this.listaActual = this.recetasNoListas;
      this.recetasListaBH$.next(this.recetasNoListas);
    }*/

  }
}
