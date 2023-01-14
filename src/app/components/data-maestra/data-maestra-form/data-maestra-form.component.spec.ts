import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataMaestraFormComponent } from './data-maestra-form.component';

describe('DataMaestraFormComponent', () => {
  let component: DataMaestraFormComponent;
  let fixture: ComponentFixture<DataMaestraFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DataMaestraFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DataMaestraFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
