import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as queryString from 'query-string';

import { AppModule } from '../app.module';

import { FilterParams, NewsResponse, SourceResponse } from '../interfaces';
import { ArticleModel, SourceModel } from '../models';


const newsListCreatedByMe = [];

@Injectable({
  providedIn: 'root',
})
export class NewsApiService {
  private API_KEY = '&apiKey=1266eb52a4c64e3b88d14bbb2c0423f3';
  private BASE_URL = 'https://newsapi.org/v2/';
  private SOURCES_ENDPOINT = 'sources?';
  private NEWS_ENDPOINT = 'top-headlines?';

  constructor(private http: HttpClient) {}

  getSource(): Promise<Array<SourceModel>> {
    return this.http
      .get<SourceResponse>(`${this.BASE_URL}${this.SOURCES_ENDPOINT}${this.API_KEY}`)
      .toPromise()
      .then((response: SourceResponse) => response.sources)
      .catch(this.handleError);
  }

  getNews(newsParams: FilterParams = { sources: 'abc-news' }, createdByMeParam: boolean = false): Promise<Array<ArticleModel>> {
    const query = queryString.stringify(newsParams);
    console.log(query);
    return this.http
      .get<NewsResponse>(`${this.BASE_URL}${this.NEWS_ENDPOINT}${query}${this.API_KEY}`)
      .toPromise()
      .then((response: NewsResponse) => response.articles.concat(newsListCreatedByMe))
      .then(news => {
        console.log(news);
        return news = createdByMeParam ? news.filter(artcile => artcile.createdByMe) : news
      })
      .catch(this.handleError);
  }

  getOneNews(id: string): ArticleModel {
    return newsListCreatedByMe.find(oneNews => oneNews.id === id);
  }

  createNews(news: ArticleModel): void {
    newsListCreatedByMe.push(news);
  }

  updateNews(news: ArticleModel): void {
    const index = newsListCreatedByMe.findIndex(oneNews => oneNews.id === news.id);

    if (index > -1) {
      newsListCreatedByMe.splice(index, 1, news);
    }
  }

  deleteNews(news: ArticleModel): void {
    const index = newsListCreatedByMe.findIndex(oneNews => oneNews.id === news.id);

    if (index > -1) {
      newsListCreatedByMe.splice(index, 1);
    }
  }


  private handleError(error: Error): Promise<any> {
    console.log('An error occurred', error);
    return Promise.reject(error.message || error);
  }
}
