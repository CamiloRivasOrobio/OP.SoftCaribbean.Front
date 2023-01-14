import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaestrasFormComponent } from './maestras-form.component';

describe('MaestrasFormComponent', () => {
  let component: MaestrasFormComponent;
  let fixture: ComponentFixture<MaestrasFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MaestrasFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MaestrasFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
