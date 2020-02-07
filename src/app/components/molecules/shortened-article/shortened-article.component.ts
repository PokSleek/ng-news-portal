import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import { Router } from '@angular/router';
import {ArticleModel} from "../../../models";

@Component({
  selector: 'app-shortened-article',
  templateUrl: './shortened-article.component.html',
  styleUrls: ['./shortened-article.component.scss']
})
export class ShortenedArticleComponent implements OnInit, OnChanges {
  @Input() article: ArticleModel;
  private contentGrid: string;
  private imageGrid: string;

  constructor(
    private router: Router
  ) {


    console.log(this.imageGrid, this.contentGrid);
    }

  ngOnInit(): void {
  }

  ngOnChanges(changes): void {
    this.recalculateGrid(changes.article.currentValue);
  }

  recalculateGrid(article: ArticleModel): void {
      const { isCreatedByMe, urlToImage } = article;

      const imageGridLength = isCreatedByMe ? 4 : 5;
      const contentGridLength = urlToImage !== 'null' ? 12 - imageGridLength : isCreatedByMe ? 10 : 12;

      this.imageGrid = `col-md-${imageGridLength}`;
      this.contentGrid = `col-md-${contentGridLength}`;
  }

  redirectToArticle(): void {
    this.router.navigate(['/article/123']);
  }

  onDelete(): void {
    console.log('Deleted');
  }

  onEdit(): void {
    console.log('Edited');
    this.router.navigate(['/edit/123']);
  }
}
