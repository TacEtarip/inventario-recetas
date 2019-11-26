import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl, FormBuilder } from '@angular/forms';
import { fromEvent, BehaviorSubject } from 'rxjs';
import { map, debounceTime, pluck, distinctUntilChanged } from 'rxjs/operators';
import { debug } from 'util';
@Component({
  selector: 'app-recetas',
  templateUrl: './recetas.component.html',
  styleUrls: ['./recetas.component.scss']
})
export class RecetasComponent implements OnInit {
  form: FormGroup;

  ordenadoAscendente = null;

  busquedaValor = '';

  resetasLista = [
    { url: 'assets/frijoles.jpg', nombre: 'Frijoles', descripcion: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.' },
    { url: 'assets/ceviche.jpg', nombre: 'Ceviche', descripcion: 'El ceviche es un plato típico de la gastronomía latinoamericana en general, teniendo cada país su particular estilo de preparación.' },
    { url: 'assets/papa.jpg', nombre: 'Papa Rellena', descripcion: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.' },
    { url: 'assets/ensalada.jpg', nombre: 'Ensalada De Frutas', descripcion: 'Nada más nutritivo, sano, delicioso y fresco para un día de calor que una ensalada de frutas. Es uno de los platos más fáciles de preparar, pero aun así de los más nutritivos, saludables y con pocas calorías para cuidar nuestra salud y a la misma vez comer rico.' },
  ];

  busquedaLista: any[] = [];

  resetasListaBH$: BehaviorSubject<any[]> = new BehaviorSubject<any[]>(null);

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {

    this.resetasListaBH$.next(this.resetasLista);

    this.resetasListaBH$.subscribe(() => {
      if (this.ordenadoAscendente === null) {
        this.ordernarListaAscendente();
      } else if (this.ordenadoAscendente === true) {
        this.ordernarListaAscendente();
      } else {
        this.ordernarListaDescendente();
      }
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
      this.resetasListaBH$.next(this.resetasLista);
      return;
    } else {
      this.resetasListaBH$.value.forEach(element => {
        listaTemporal.push(element.nombre.toUpperCase().replace(/\s/g, '').trim());
      });

      // let generalMatches = 0;
      let elementoIn = 0;

      listaTemporal.forEach(element => {
        if (element.includes(this.busquedaValor)) {
          this.busquedaLista.push(this.resetasListaBH$.value[elementoIn]);
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
        this.resetasListaBH$.next(this.busquedaLista);
      }

    }
  }

  ordernarListaAscendente() {
    if (this.ordenadoAscendente) {
      return;
    }
    this.resetasListaBH$.value.sort((a, b) => (a.nombre > b.nombre) ? 1 : -1);
    this.ordenadoAscendente = true;
  }


  ordernarListaDescendente() {
    if (!this.ordenadoAscendente) {
      return;
    }
    this.resetasListaBH$.value.sort((a, b) => (a.nombre < b.nombre) ? 1 : -1);
    this.ordenadoAscendente = false;
  }
}
