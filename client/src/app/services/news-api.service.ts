import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as queryString from 'query-string';

import { FilterParams, NewsResponse, SourceResponse } from '../interfaces';
import { ArticleModel, SourceModel } from '../models';

const API_KEY = '&apiKey=1266eb52a4c64e3b88d14bbb2c0423f3';
const BASE_URL = 'https://newsapi.org/v2/';
const SOURCES_ENDPOINT = 'sources?';
const NEWS_ENDPOINT = 'top-headlines?';

@Injectable()
export class NewsApiService {
  public sources: Array<SourceModel> = [];
  public articles: Array<ArticleModel> = [];

  constructor(private http: HttpClient) {}


  private static handleError(error: Error): Promise<any> {
    console.log('Error :: ', error);
    return Promise.reject(error.message || error);
  }

  fetchSource(): Promise<Array<SourceModel>> {
    return this.http
      .get<SourceResponse>(`${BASE_URL}${SOURCES_ENDPOINT}${API_KEY}`)
      .toPromise()
      .then((response: SourceResponse) => {
        this.sources = response.sources;
        console.log(this.sources);
        return this.sources;
      })
      .catch(NewsApiService.handleError);
  }

  fetchArticles(newsParams: FilterParams = { sources: 'abc-news' }): Promise<Array<ArticleModel>> {
    const query = queryString.stringify(newsParams);
    return this.http
      .get<NewsResponse>(`${BASE_URL}${NEWS_ENDPOINT}${query}${API_KEY}`)
      .toPromise()
      .then((response: NewsResponse) => {
        this.articles = response.articles;
        console.log(this.articles);
        return this.articles;
      })
      .catch(NewsApiService.handleError);
  }

  fetchCustomNews() {
    return this.http
      .get('http://localhost:7000/news')
      .toPromise()
      .then((response: any) => {
        console.log(response);
        return response.data;
      })
      .catch(NewsApiService.handleError);
  }

  getArticles(): Array<ArticleModel> {
    return this.articles;
  }
}
