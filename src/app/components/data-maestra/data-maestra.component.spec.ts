import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataMaestraComponent } from './data-maestra.component';

describe('DataMaestraComponent', () => {
  let component: DataMaestraComponent;
  let fixture: ComponentFixture<DataMaestraComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DataMaestraComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DataMaestraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
