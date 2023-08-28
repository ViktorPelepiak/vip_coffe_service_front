import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdministrationModelsComponent } from './administration-models.component';

describe('AdministrationModelsComponent', () => {
  let component: AdministrationModelsComponent;
  let fixture: ComponentFixture<AdministrationModelsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdministrationModelsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdministrationModelsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
