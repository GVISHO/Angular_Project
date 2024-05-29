import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FaqIconsComponent } from './faq-icons.component';

describe('FaqIconsComponent', () => {
  let component: FaqIconsComponent;
  let fixture: ComponentFixture<FaqIconsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FaqIconsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FaqIconsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
