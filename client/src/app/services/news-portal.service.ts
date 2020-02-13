import { Injectable } from '@angular/core';
import { ArticleModel } from '../models';

import { CustomApiService } from './custom-api.service';
import { NewsApiService } from './news-api.service';


@Injectable()
export class NewsPortalService {
  private isCreatedByMe: boolean = false;

  public articles: Array<ArticleModel>;


  constructor(
    public customApiService: CustomApiService,
    public newsApiService: NewsApiService
  ) {

  }

  getArticles(filter: any): ArticleModel[] {
    return this.articles = this.isCreatedByMe ? this.customApiService.articles : this.newsApiService.articles;
  }

  addChunk() {

  }


}
