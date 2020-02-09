import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShortenedArticleComponent } from './shortened-article.component';

describe('ShortenedArticleComponent', () => {
  let component: ShortenedArticleComponent;
  let fixture: ComponentFixture<ShortenedArticleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShortenedArticleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShortenedArticleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
