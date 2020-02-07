import {Component, Input, OnInit, OnChanges} from '@angular/core';
import { NewsApiService } from "../../../services/news-api.service";
import { ArticleModel } from "../../../models";

@Component({
  selector: 'app-articles-list',
  templateUrl: './articles-list.component.html',
  styleUrls: ['./articles-list.component.scss'],
  providers: [NewsApiService]
})
export class ArticlesListComponent implements OnInit, OnChanges {
  @Input() articles: Array<ArticleModel>;

  constructor(
    private newsApiService: NewsApiService,
  ) {

  }


  ngOnInit() {
    // this.newsApiService.getArticles()
    //   .then(articles => {
    //     console.log(articles);
    //     this.articles = articles;
    //   });
  }

  ngOnChanges(changes): void {
    console.log(changes);
  }

}
