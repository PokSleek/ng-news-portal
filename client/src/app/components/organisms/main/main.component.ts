import { Component, OnInit } from '@angular/core';
import { NewsApiService } from '../../../services/news-api.service';
import { ArticleModel } from '../../../models';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  public headerInfo = 'Select Source';

  constructor(
    public newsApiService: NewsApiService,
  ) {}

  ngOnInit() {
    this.newsApiService.fetchArticles();
  }

  onHeaderChange(newSource: string) {
    this.headerInfo = newSource ? newSource : 'Select Source';
  }
}
