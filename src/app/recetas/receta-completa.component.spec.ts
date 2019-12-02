import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecetaCompletaComponent } from './receta-completa.component';

describe('RecetaCompletaComponent', () => {
  let component: RecetaCompletaComponent;
  let fixture: ComponentFixture<RecetaCompletaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecetaCompletaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecetaCompletaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
