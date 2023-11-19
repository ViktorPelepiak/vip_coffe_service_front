import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoffeeMachinesMyComponent } from './coffee-machines-my.component';

describe('CoffeeMachinesMyComponent', () => {
  let component: CoffeeMachinesMyComponent;
  let fixture: ComponentFixture<CoffeeMachinesMyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CoffeeMachinesMyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CoffeeMachinesMyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
