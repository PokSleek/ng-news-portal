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
  public pageSize = 4;
  public page = 1;
  public totalArticles: number;

  public isCreatedByMe = false;
  public sources: Array<SourceModel> = [];
  public articles: Array<ArticleModel> = [];
  public customArticles: Array<ArticleModel> = [];
  private articleInfo: { sources: string; q: string; page: number; };


  constructor(private http: HttpClient) {
    this.articleInfo = {
      sources: 'abc-news',
      q: '',
      page: 0,
    };
    this.totalArticles = 0;
  }

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
        return this.sources;
      })
      .catch(NewsApiService.handleError);
  }

  fetchArticles(newsParams: FilterParams = { sources: 'abc-news' }): Promise<Array<ArticleModel>> {
    const { q, sources } = newsParams;
    let isSameRequest = false;
    if ( this.articleInfo.q === q && this.articleInfo.sources === sources ) {
      isSameRequest = true;
      this.articleInfo.page++;
    } else {
      this.articleInfo = {
        sources,
        q,
        page: 1
      };
    }
    const query = queryString.stringify({...this.articleInfo, pageSize: this.pageSize});
    console.log(query);
    return this.http
      .get<NewsResponse>(`${BASE_URL}${NEWS_ENDPOINT}${query}${API_KEY}`)
      .toPromise()
      .then((response: NewsResponse) => {
        this.totalArticles = response.totalResults;
        this.articles = isSameRequest ? [...this.articles, ...response.articles] : response.articles;
        console.log(response, this.articles);
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
        this.customArticles = response.data;
        return response.data;
      })
      .catch(NewsApiService.handleError);
  }

  getArticles(): Array<ArticleModel> {
    return this.isCreatedByMe ? this.customArticles : this.articles;
  }

  loadMore(): void {
    if (this.isCreatedByMe) {

    } else {
      this.fetchArticles(this.articleInfo);
    }
  }

  getArticleById(id) {
    return this.http
      .get(`http://localhost:7000/news/${id}`)
      .toPromise()
      .then((response: any) => {
        console.log(response);
        return response.data;
      })
      .catch(NewsApiService.handleError);
  }

  updateArticleById(id, data) {
    return this.http
    .patch(`http://localhost:7000/news/${id}`, {data})
    .toPromise()
    .then((response: any) => {
      console.log(response);
      return response.data;
    })
    .catch(NewsApiService.handleError);
  }

  saveArticle(data) {
    return this.http
      .post('http://localhost:7000/news', {data})
      .toPromise()
      .then((response: any) => {
        console.log(response);
        return response.data;
      })
      .catch(NewsApiService.handleError);
  }

  deleteArticle(id) {
    return this.http
      .delete(`http://localhost:7000/news/${id}`)
      .toPromise()
      .then((response: any) => {
        console.log(response);
        return response.data;
      })
      .catch(NewsApiService.handleError);
  }
}
