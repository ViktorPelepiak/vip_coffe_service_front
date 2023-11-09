import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdministrationCharacteristicTypesComponent } from './administration-characteristic-types.component';

describe('AdministrationCharacteristicTypesComponent', () => {
  let component: AdministrationCharacteristicTypesComponent;
  let fixture: ComponentFixture<AdministrationCharacteristicTypesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdministrationCharacteristicTypesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdministrationCharacteristicTypesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
