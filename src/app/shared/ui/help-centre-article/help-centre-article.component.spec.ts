import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HelpCentreArticleComponent } from './help-centre-article.component';

describe('HelpCentreArticleComponent', () => {
  let component: HelpCentreArticleComponent;
  let fixture: ComponentFixture<HelpCentreArticleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HelpCentreArticleComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HelpCentreArticleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
