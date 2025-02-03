import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormTareaPage } from './form-tarea.page';

describe('FormTareaPage', () => {
  let component: FormTareaPage;
  let fixture: ComponentFixture<FormTareaPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(FormTareaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
