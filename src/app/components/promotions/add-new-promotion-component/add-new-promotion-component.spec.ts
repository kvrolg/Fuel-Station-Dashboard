import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNewPromotionComponent } from './add-new-promotion-component';

describe('AddNewPromotionComponent', () => {
  let component: AddNewPromotionComponent;
  let fixture: ComponentFixture<AddNewPromotionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddNewPromotionComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AddNewPromotionComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
