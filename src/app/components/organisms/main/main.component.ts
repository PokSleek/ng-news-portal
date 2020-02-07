import { Component, OnInit } from '@angular/core';
import { NewsApiService } from "../../../services/news-api.service";
import { ArticleModel } from "../../../models";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  headerInfo: string;
  private articles: Array<ArticleModel>;

  constructor(
    private newsApiService: NewsApiService,
  ) {
    this.articles = [];
    this.headerInfo = 'Select Source';
  }

  ngOnInit() {
    this.newsApiService.getArticles()
      .then(articles => {
        console.log(articles);
        this.articles = articles;
      });
  }
  onHeaderChange(newSource: string) {
    this.headerInfo = newSource ? newSource : 'Select Source';
  }
}
