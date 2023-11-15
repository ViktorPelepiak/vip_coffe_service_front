import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoffeeMachineNewComponent } from './coffee-machine-new.component';

describe('CoffeeMachineNewComponent', () => {
  let component: CoffeeMachineNewComponent;
  let fixture: ComponentFixture<CoffeeMachineNewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CoffeeMachineNewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CoffeeMachineNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
