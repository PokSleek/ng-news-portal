import { Document, Schema } from 'mongoose';


export interface IArticleModel extends Document {
  _id: Schema.Types.ObjectId;
  source: ISource;
  author: string;
  title: string;
  description: string;
  url: string;
  urlToImage: string;
  publishedAt: string;
  content: string;
}

export interface ISource {
  id: string;
  name: string;
}

export interface IUser extends Document {
  _id: Schema.Types.ObjectId;
  nickname: string;
  name: string;
  email: string;
  password: string;
}
