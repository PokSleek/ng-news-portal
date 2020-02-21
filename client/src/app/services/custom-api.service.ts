import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

import { urlBuilder } from '../utils';
import { ArticleModel } from "../models";
import { CustomApiResponse } from "../interfaces/news-response";

@Injectable()
export class CustomApiService {

  private readonly getUrl = urlBuilder('http://localhost:7000/news');

  public totalArticles: Array<ArticleModel> = [];
  public totalResults: number = 0;

  public articles: Array<ArticleModel> = [];
  private readonly articleChunkSize: number = 4;
  private articleChunkNumber: number = 0;

  constructor(
    private http: HttpClient
  ) {  }

  private static handleError(error: Error): Promise<any> {
    console.log('Error :: ', error);
    return Promise.reject(error.message || error);
  }

  addArticleChunk(): void {
    const articleChunk: Array<ArticleModel> = [];
    const startIndex = this.articleChunkNumber * this.articleChunkSize;
    const endIndex = startIndex + this.articleChunkSize;

    for (let i = startIndex; i < endIndex; i++) {
      articleChunk.push(this.totalArticles[i]);
    }
    this.articleChunkNumber++;
    this.articles = [...this.articles, ...articleChunk];
  }

  fetchArticles(): Promise<any> {
    return this.http
      .get(this.getUrl())
      .toPromise()
      .then((response: CustomApiResponse) => {
        console.log('fetchCustomArticles ::', response);

        this.totalResults = response.totalResults;
        this.totalArticles = response.data;

        this.articleChunkNumber = 0;
        this.addArticleChunk();

        return response.data;
      })
      .catch(CustomApiService.handleError);
  }

  getArticleById(id: string): Promise<any> {
    return this.http
      .get(this.getUrl(id))
      .toPromise()
      .then((response: CustomApiResponse) => {
        console.log('getArticleById ::', response);
        return response.data;
      })
      .catch(CustomApiService.handleError);
  }

  updateArticleById(id: string, data: object): Promise<any> {
    return this.http
      .patch(this.getUrl(id), {data})
      .toPromise()
      .then((response: CustomApiResponse) => {
        console.log('updateArticleById ::', response);
        return response.data;
      })
      .catch(CustomApiService.handleError);
  }

  saveArticle(data: object): Promise<any> {
    return this.http
      .post(this.getUrl(), {data})
      .toPromise()
      .then((response: CustomApiResponse) => {
        console.log('saveArticle ::', response);
        return response.data;
      })
      .catch(CustomApiService.handleError);
  }

  deleteArticle(id: string): Promise<any> {
    return this.http
      .delete(this.getUrl(id))
      .toPromise()
      .then((response: CustomApiResponse) => {
        console.log('deleteArticle ::', response);
        return response.data;
      })
      .catch(CustomApiService.handleError);
  }
}
