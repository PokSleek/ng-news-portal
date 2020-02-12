import { ArticleModel } from '../models';

export interface NewsResponse {
  status: string;
  totalResults: number;
  articles: Array<ArticleModel>;
}

export interface CustomApiResponse {
  message: string,
  totalResults?: number,
  data?: Array<ArticleModel>
  log?: object,
}
