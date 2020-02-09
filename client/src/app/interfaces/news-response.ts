import { ArticleModel } from '../models';

export interface NewsResponse {
  status: string;
  totalResults: number;
  articles: Array<ArticleModel>;
}