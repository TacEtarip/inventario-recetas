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

  promptEvent;

  constructor(private router: Router, update: SwUpdate) {
    update.available.subscribe(event => {
      if (this.promptUser(event)) {
        window.location.reload();
      }
    });

    window.addEventListener('beforeinstallprompt', event => {
      event.preventDefault();
      this.promptEvent = event;
      this.showUserInstall();
    });
  }

  acceptedInstall() {
    this.promptEvent.prompt();
    this.promptEvent.userChoice.then(((choiceResult) => {
      if (choiceResult.outcome === 'accepted') {
        console.log('Its accepted');
      }
      this.promptEvent = null;
    }));
  }
  showUserInstall() { }
  promptUser(event) {
    return true;
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
