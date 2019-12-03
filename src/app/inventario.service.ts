import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class InventarioService {



  listaIngredientes = [
    { id: 11, cantidad: 1, nombre: 'Banana', categoria: 'Frutas' },
    { id: 12, cantidad: 2, nombre: 'Naranja', categoria: 'Frutas' },
    { id: 13, cantidad: 1, nombre: 'Piña', categoria: 'Frutas' },
    { id: 14, cantidad: 1, nombre: 'Kiwi', categoria: 'Frutas' },
    { id: 15, cantidad: 1, nombre: 'Manzana', categoria: 'Frutas' },
    { id: 16, cantidad: 3, nombre: 'Cebolla', categoria: 'Verduras' },
    { id: 17, cantidad: 3, nombre: 'Pollo Entero', categoria: 'Carnes' },
    { id: 20, cantidad: 10, nombre: 'Apio', categoria: 'Verduras' },
    { id: 21, cantidad: 10, nombre: 'Pescado', categoria: 'Carnes' },
    { id: 22, cantidad: 5, nombre: 'Limon', categoria: 'Verduras' }
  ];

  listaInventarioCompleto = [
    {
      nombreLista: 'Frutas',
      lista: []
    },
    {
      nombreLista: 'Verduras',
      lista: []
    },
    {
      nombreLista: 'Carnes',
      lista: []
    }];


  constructor() { }
  reduceInventario() {
    console.log(this.listaIngredientes);
  }



}
