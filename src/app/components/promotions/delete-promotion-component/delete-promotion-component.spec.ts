import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeletePromotionComponent } from './delete-promotion-component';

describe('DeletePromotionComponent', () => {
  let component: DeletePromotionComponent;
  let fixture: ComponentFixture<DeletePromotionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeletePromotionComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DeletePromotionComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
