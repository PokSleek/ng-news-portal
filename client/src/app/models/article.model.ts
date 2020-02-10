import { SourceModel } from './source.model';

export class ArticleModel {
  constructor(
    public _id?: string,
    public id?: string,
    public source: { id: string, name: string } = { id: '',  name: '' },
    public author: string = '',
    public title: string = '',
    public description: string = '',
    public url: string = '',
    public urlToImage: string = '',
    public publishedAt: string = '',
    public content: string = '',
    public __v?: string,

  ) {
    this.id = id;
    this.source = source;
    this.author = author;
    this.title = title;
    this.description = description;
    this.url = url;
    this.urlToImage = urlToImage;
    this.publishedAt = publishedAt;
    this.content = content;
  }
}
