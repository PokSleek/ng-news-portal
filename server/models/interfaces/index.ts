import { Schema, Document } from 'mongoose';

export interface IArticleModel extends Document{
    _id: Schema.Types.ObjectId,
    source: ISource,
    author: String,
    title: String,
    description: String,
    url: String,
    urlToImage: String,
    publishedAt: String,
    content: String,
}

export interface ISource {
    id: String,
    name: String,
}

export interface IUser extends Document{
    _id: Schema.Types.ObjectId,
    nickname: String,
    name: String,
    email: String,
    password: String,
}
