import { Component, OnInit, Input } from '@angular/core';
import { RecetasService } from '../recetas.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-receta-completa',
  templateUrl: './receta-completa.component.html',
  styleUrls: ['./receta-completa.component.scss']
})
export class RecetaCompletaComponent implements OnInit {



  receta: any;
  temportal;
  ingredientesOpen = true;
  step = -1;

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

  constructor(private recetasService: RecetasService, private activatedRoute: ActivatedRoute) {
    this.activatedRoute.paramMap
      .subscribe(paramMap => {
        this.receta = this.recetasService
          .getReceta(paramMap.get('id-receta-nombre'));
      });
  }

  ngOnInit() {
    console.log(this.receta);
  }

  getNumberOfExtraIngredients() {
    if (this.receta.ingredientes_extra.length !== 0) {
      return true;
    }
    return false;
  }

}
