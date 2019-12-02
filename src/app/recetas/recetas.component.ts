import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl, FormBuilder } from '@angular/forms';
import { fromEvent, BehaviorSubject } from 'rxjs';
import { map, debounceTime, pluck, distinctUntilChanged } from 'rxjs/operators';
import { Router } from '@angular/router';
import { RecetasService } from '../recetas.service';
import { debug } from 'util';
@Component({
  selector: 'app-recetas',
  templateUrl: './recetas.component.html',
  styleUrls: ['./recetas.component.scss']
})
export class RecetasComponent implements OnInit {

  menuOpc = ['Todas', 'Listas', 'No Listas'];

  menuActivo = 'Todas';

  form: FormGroup;

  ordenadoAscendente = null;

  busquedaValor = '';

  recetasLista;

  recetasYaListas = [];

  recetasNoListas = [];

  listaActual;

  busquedaLista: any[] = [];


  recetasListaBH$: BehaviorSubject<any[]> = new BehaviorSubject<any[]>(null);

  constructor(
    private recetasService: RecetasService,
    private router: Router,
    private formBuilder: FormBuilder) {
    this.recetasLista = recetasService.recetasLista;
  }

  ngOnInit() {
    this.listaActual = this.recetasLista;

    this.recetasLista.forEach(receta => {
      if (receta.listo) {
        this.recetasYaListas.push(receta);
      } else {
        this.recetasNoListas.push(receta);
      }
    });
    // console.log(this.recetasNoListas);

    this.recetasListaBH$.next(this.recetasService.recetasLista);

    this.recetasListaBH$.subscribe(() => {
      /* if (this.ordenadoAscendente === null) {
         this.ordernarListaAscendente();
       } else if (this.ordenadoAscendente === true) {
         this.ordernarListaAscendente();
       } else {
         this.ordernarListaDescendente();
       }*/
      this.ordernarListaAscendente();
      console.log('hola');
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

  cambiarShow(index) {

    if (this.menuOpc[index] === 'Todas') {
      this.listaActual = this.recetasLista;
      this.recetasListaBH$.next(this.recetasLista);
    } else if (this.menuOpc[index] === 'Listas') {
      this.listaActual = this.recetasYaListas;
      this.recetasListaBH$.next(this.recetasYaListas);
    } else {
      this.listaActual = this.recetasNoListas;
      this.recetasListaBH$.next(this.recetasNoListas);
    }
    const temporal = this.menuOpc[0];
    this.menuOpc[0] = this.menuOpc[index];
    this.menuOpc[index] = temporal;

  }

  irReceta(id) {
    this.router.navigate(['/recetas/', 'id-receta:' + id]);
  }

  buscarReceta() {
    const listaTemporal: string[] = [];
    this.busquedaLista = [];
    let hasInclusive = false;

    this.busquedaValor = this.busquedaValor.toUpperCase().replace(/\s/g, '').trim();
    if (this.busquedaValor.length <= 3) {

      this.recetasListaBH$.next(this.listaActual);
      return;
    } else {
      this.recetasListaBH$.value.forEach(element => {
        listaTemporal.push(element.nombre.toUpperCase().replace(/\s/g, '').trim());
      });

      // let generalMatches = 0;
      let elementoIn = 0;

      listaTemporal.forEach(element => {
        if (element.includes(this.busquedaValor)) {
          this.busquedaLista.push(this.recetasListaBH$.value[elementoIn]);
          hasInclusive = true;
        }
        elementoIn++;
      });

      elementoIn = 0;
      /*
      listaTemporal.forEach(element => {
        if (!hasInclusive) {
          for (let index = 0; index < this.busquedaValor.length; index++) {
            // console.log(this.busquedaValor.charAt(index));
            for (let yendex = 0; yendex < element.length; yendex++) {
              // console.log(element.charAt(yendex));
              if (element.charAt(yendex) === this.busquedaValor.charAt(index)) {
                matches++;
              }
            }
          }
          if (matches > 3) {
            this.busquedaLista.push(this.resetasListaBH$.value[elementoIn]);
          }
          matches = 0;
          elementoIn++;
        }
        return;
      });*/

      if (this.busquedaLista.length !== 0) {
        this.recetasListaBH$.next(this.busquedaLista);
      }

    }
  }

  ordernarListaAscendente() {
    /*if (this.ordenadoAscendente) {
      return;
    }*/
    this.recetasListaBH$.value.sort((a, b) => (a.nombre > b.nombre) ? 1 : -1);
    // this.ordenadoAscendente = true;
  }


  ordernarListaDescendente() {
    if (!this.ordenadoAscendente) {
      return;
    }
    this.recetasListaBH$.value.sort((a, b) => (a.nombre < b.nombre) ? 1 : -1);
    this.ordenadoAscendente = false;
  }
}
