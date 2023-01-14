import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DescargarPdfComponent } from './descargar-pdf.component';

describe('DescargarPdfComponent', () => {
  let component: DescargarPdfComponent;
  let fixture: ComponentFixture<DescargarPdfComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DescargarPdfComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DescargarPdfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
