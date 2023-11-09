import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdministrationPartTypesComponent } from './administration-part-types.component';

describe('AdministrationPartTypesComponent', () => {
  let component: AdministrationPartTypesComponent;
  let fixture: ComponentFixture<AdministrationPartTypesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdministrationPartTypesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdministrationPartTypesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
