import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl, FormBuilder } from '@angular/forms';
import { fromEvent, BehaviorSubject, concat } from 'rxjs';
import { map, debounceTime, pluck, distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'app-inventario',
  templateUrl: './inventario.component.html',
  styleUrls: ['./inventario.component.scss']
})
export class InventarioComponent implements OnInit {
  form: FormGroup;

  ordenadoAscendente = null;

  busquedaValor = '';

  listaInventarioFrutas = [
    { url: 'assets/frijoles.jpg', nombre: 'Pera', cantidad: 2 },
    { url: 'assets/frijoles.jpg', nombre: 'Manzana', cantidad: 2 },
    { url: 'assets/frijoles.jpg', nombre: 'Platano', cantidad: 3 },
  ];

  listaInventarioVerduras = [
    { url: 'assets/frijoles.jpg', nombre: 'Zanahoria', cantidad: 2 },
    { url: 'assets/frijoles.jpg', nombre: 'Cebolla', cantidad: 3 },
    { url: 'assets/frijoles.jpg', nombre: 'Espinaca', cantidad: 1 }
  ];

  listaInventario = this.listaInventarioFrutas.concat(this.listaInventarioVerduras);

  busquedaLista: any[] = [];

  frutasInventarioListaBH$: BehaviorSubject<any[]> = new BehaviorSubject<any[]>(null);
  verdurasInventarioListaBH$: BehaviorSubject<any[]> = new BehaviorSubject<any[]>(null);
  inventarioListaBH$: BehaviorSubject<any[]> = new BehaviorSubject<any[]>(null);


  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.frutasInventarioListaBH$.next(this.listaInventarioFrutas);
    this.verdurasInventarioListaBH$.next(this.listaInventarioVerduras);
    this.inventarioListaBH$.next(this.listaInventario);

    this.inventarioListaBH$.subscribe(() => {

    });

    const cajaDeBusqueda = document.getElementById('busqueda');
    const keyup$ = fromEvent(cajaDeBusqueda, 'keyup');

    keyup$.pipe(
      pluck('target', 'value'),
      map((value: string) => this.busquedaValor = value),
      debounceTime(500),
      distinctUntilChanged())
      .subscribe(x => { this.buscarReceta(); console.log(x); });

    this.form = this.formBuilder.group({
      busqueda: this.formBuilder.control('', Validators.compose([])),
    });
  }



  buscarReceta() {
    const listaTemporal: string[] = [];
    this.busquedaLista = [];
    let hasInclusive = false;

    this.busquedaValor = this.busquedaValor.toUpperCase().replace(/\s/g, '').trim();
    if (this.busquedaValor.length <= 3) {
      this.inventarioListaBH$.next(this.listaInventario);
      return;
    } else {
      this.inventarioListaBH$.value.forEach(element => {
        listaTemporal.push(element.nombre.toUpperCase().replace(/\s/g, '').trim());
      });

      // let generalMatches = 0;
      let elementoIn = 0;

      listaTemporal.forEach(element => {
        if (element.includes(this.busquedaValor)) {
          this.busquedaLista.push(this.inventarioListaBH$.value[elementoIn]);
          hasInclusive = true;
        }
        elementoIn++;
      });

      elementoIn = 0;

      if (this.busquedaLista.length !== 0) {
        this.inventarioListaBH$.next(this.busquedaLista);
      }

    }
  }


}
