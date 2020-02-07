import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as queryString from 'query-string';

import { AppModule } from '../app.module';

import { FilterParams, NewsResponse, SourceResponse } from '../interfaces';
import { ArticleModel, SourceModel } from '../models';

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
      .then((response: NewsResponse) => response.articles)
      .catch(this.handleError);
  }

  private handleError(error: Error): Promise<any> {
    console.log('An error occurred', error);
    return Promise.reject(error.message || error);
  }
}
