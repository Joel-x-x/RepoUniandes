import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormProyectoPage } from './form-proyecto.page';

describe('FormProyectoPage', () => {
  let component: FormProyectoPage;
  let fixture: ComponentFixture<FormProyectoPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(FormProyectoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
