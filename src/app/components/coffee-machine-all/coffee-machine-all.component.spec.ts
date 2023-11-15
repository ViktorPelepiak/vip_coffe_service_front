import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoffeeMachineAllComponent } from './coffee-machine-all.component';

describe('CoffeeMachineAllComponent', () => {
  let component: CoffeeMachineAllComponent;
  let fixture: ComponentFixture<CoffeeMachineAllComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CoffeeMachineAllComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CoffeeMachineAllComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
