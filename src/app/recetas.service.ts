import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RecetasService {
  recetasLista = [
    {
      id: 0,
      url_img: 'assets/frijoles.jpg',
      nombre: 'Frijoles',
      listo: false,
      descripcion_opc: null,
      ingredientes: [{ id: 15, cantidad_necesaria: 2, nombre: 'Manzana' }],
      ingredientes_extra: ['Sal', 'Pimienta'],
      pasos: [{ step: 0, descripcion: '', url_img: '' }]
    },
    {
      id: 1,
      url_img: 'assets/ceviche.jpg',
      nombre: 'Ceviche',
      listo: false,
      descripcion_opc: null,
      ingredientes: [
        { id: 20, cantidad_necesaria: 1, nombre: 'Apio' },
        { id: 21, cantidad_necesaria: 1, nombre: 'Pescado' },
        { id: 22, cantidad_necesaria: 12, nombre: 'Limon' }],
      ingredientes_extra: ['Sal', 'Pimienta'],
      pasos: [{ step: 0, descripcion: '', url_img: '' }]
    },
    {
      id: 2,
      url_img: 'assets/ensalada.jpg',
      nombre: 'Ensalada De Frutas',
      listo: false,
      descripcion_opc: null,
      ingredientes: [
        { id: 11, cantidad_necesaria: 1, nombre: 'Banana' },
        { id: 12, cantidad_necesaria: 2, nombre: 'Naranja' },
        { id: 13, cantidad_necesaria: 1, nombre: 'Piña' },
        { id: 14, cantidad_necesaria: 1, nombre: 'Kiwi' },
        { id: 15, cantidad_necesaria: 1, nombre: 'Manzana' }],
      ingredientes_extra: ['Azucar'],
      pasos: [{ step: 0, descripcion: '', url_img: '' }, { step: 1, descripcion: '', url_img: '' }]
    }
  ];

  getReceta(link: string) {
    const searchID = parseInt(link.replace('id-receta:', ''), 10);
    const index = this.recetasLista.findIndex(b => b.id === searchID);
    return this.recetasLista[index];
  }
  constructor() { }
}
