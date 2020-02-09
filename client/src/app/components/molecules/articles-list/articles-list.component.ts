import {Component, Input, OnInit, OnChanges} from '@angular/core';
import { NewsApiService } from "../../../services/news-api.service";
import { ArticleModel } from "../../../models";

@Component({
  selector: 'app-articles-list',
  templateUrl: './articles-list.component.html',
  styleUrls: ['./articles-list.component.scss'],
})
export class ArticlesListComponent implements OnInit, OnChanges {
  articles: ArticleModel[];

  constructor(
    private newsApiService: NewsApiService,
  ) {

  }


  ngOnInit() {
    this.newsApiService.fetchCustomNews();
  }

  ngOnChanges(changes): void {
    console.log(changes);
  }

}
