import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as queryString from 'query-string';

import { AppModule } from '../app.module';

import { FilterParams, NewsResponse, SourceResponse } from '../interfaces';
import { ArticleModel, SourceModel } from '../models';

const API_KEY = '&apiKey=1266eb52a4c64e3b88d14bbb2c0423f3';
const BASE_URL = 'https://newsapi.org/v2/';
const SOURCES_ENDPOINT = 'sources?';
const NEWS_ENDPOINT = 'top-headlines?';

@Injectable({
  providedIn: 'root',
})
export class NewsApiService {
  private sources: Array<SourceModel> = [];
  private articles: Array<ArticleModel> = [];

  constructor(private http: HttpClient) {}

  getSource(): Promise<Array<SourceModel>> {
    return this.http
      .get<SourceResponse>(`${BASE_URL}${SOURCES_ENDPOINT}${API_KEY}`)
      .toPromise()
      .then((response: SourceResponse) => response.sources)
      .catch(NewsApiService.handleError);
  }

  getArticles(newsParams: FilterParams = { sources: 'abc-news' }): Promise<Array<ArticleModel>> {
    const query = queryString.stringify(newsParams);
    console.log(query);
    return this.http
      .get<NewsResponse>(`${BASE_URL}${NEWS_ENDPOINT}${query}${API_KEY}`)
      .toPromise()
      .then((response: NewsResponse) => response.articles)
      .catch(NewsApiService.handleError);
  }

  private static handleError(error: Error): Promise<any> {
    console.log('An error occurred', error);
    return Promise.reject(error.message || error);
  }
}
