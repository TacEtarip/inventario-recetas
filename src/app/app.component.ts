import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SwUpdate } from '@angular/service-worker';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  screen = 'recetas';

  constructor(private router: Router, update: SwUpdate) {
    update.available.subscribe();
  }
  ngOnInit(): void {
    console.log(this.router.url);
  }
  switchScreenToRecetas() {
    this.router.navigate(['/recetas']);
    this.screen = 'recetas';
  }

  switchScreenToInventario() {
    this.router.navigate(['/inventario']);
    this.screen = 'inventario';
  }
}
