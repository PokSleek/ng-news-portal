import { Request, Response } from 'express';
import { Types } from 'mongoose';

import { Article } from '../../models';
import { IArticleModel } from '../../models/interfaces';
import { response } from '../utils';


export const postArticle = (req: Request, res: Response): Promise<void> => {
  const { data } = req.body;

  const article = new Article({
    _id: new Types.ObjectId(),
    source: {
      id: data.source.id,
      name: data.source.name
    },
    author: data.author,
    title: data.title,
    description: data.description,
    url: data.url,
    urlToImage: data.urlToImage,
    publishedAt: data.publishedAt,
    content: data.content
  });

  return article
    .save()
    .then((data: IArticleModel) => {
      response(res, 201, {
        message: 'Added next News article to DB',
        data
      });
    })
    .catch(error => {
      console.log(error);
      response(res, 500, error);
    });
};
