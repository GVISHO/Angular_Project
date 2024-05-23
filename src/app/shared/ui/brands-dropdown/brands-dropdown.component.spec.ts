import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BrandsDropdownComponent } from './brands-dropdown.component';

describe('BrandsDropdownComponent', () => {
  let component: BrandsDropdownComponent;
  let fixture: ComponentFixture<BrandsDropdownComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BrandsDropdownComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BrandsDropdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
