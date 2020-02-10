import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import { Router } from '@angular/router';
import {ArticleModel} from '../../../models';
import { NewsApiService } from 'src/app/services/news-api.service';

@Component({
  selector: 'app-shortened-article',
  templateUrl: './shortened-article.component.html',
  styleUrls: ['./shortened-article.component.scss']
})
export class ShortenedArticleComponent implements OnInit, OnChanges {
  @Input() article: ArticleModel;
  @Input() isCreatedByMe: boolean;

  public contentGrid: string;
  public imageGrid: string;

  constructor(
    private newsApiService: NewsApiService,
    private router: Router
  ) {}

  ngOnInit(): void {
  }

  ngOnChanges(changes): void {
    this.recalculateGrid(changes.article.currentValue);
  }

  recalculateGrid(article: ArticleModel): void {
    const { urlToImage } = article;

    let imageGridLength: number;
    let contentGridLength: number;

    if (this.isCreatedByMe) {
      if (urlToImage !== 'null') {
        imageGridLength = 4;
        contentGridLength = 6;
      } else {
        contentGridLength = 6;
      }
    } else {
      if (urlToImage !== 'null') {
        imageGridLength = 5;
        contentGridLength = 7;
      } else {
        contentGridLength = 12;
      }
    }

    this.imageGrid = article.urlToImage ? `col-md-${imageGridLength}` : '';
    this.contentGrid = `col-md-${contentGridLength}`;
  }

  redirectToArticle(url: string): void {
    this.isCreatedByMe ? this.router.navigate(['/article/123']) : window.open(url);
  }

  onDelete(): void {
    this.newsApiService.deleteArticle(this.article._id)
      .then(() => this.newsApiService.fetchCustomNews());
  }

  onEdit(): void {
    console.log('Edited');
    this.router.navigate([`edit/${this.article._id}`]);
  }
}
