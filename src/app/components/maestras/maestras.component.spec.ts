import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaestrasComponent } from './maestras.component';

describe('MaestrasComponent', () => {
  let component: MaestrasComponent;
  let fixture: ComponentFixture<MaestrasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MaestrasComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MaestrasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
