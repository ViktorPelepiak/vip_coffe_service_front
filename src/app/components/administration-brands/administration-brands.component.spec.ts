import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdministrationBrandsComponent } from './administration-brands.component';

describe('AdministrationBrandsComponent', () => {
  let component: AdministrationBrandsComponent;
  let fixture: ComponentFixture<AdministrationBrandsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdministrationBrandsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdministrationBrandsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
