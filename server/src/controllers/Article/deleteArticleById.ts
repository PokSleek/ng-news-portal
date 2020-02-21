import { Request, Response } from 'express';

import { Article } from '../../models';
import { response } from '../utils';


export const deleteArticleById = (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;

  return Article
    .deleteOne({ _id: id })
    .exec()
    .then((log) => {
      const { n, deletedCount } = log;

      const message = deletedCount
        ? `Deleted article with ID: ${id}`
        : `No valid entry found by ID ${id}`;

      response(res, 200, {
        message,
        totalResults: n,
        deletedCount
      });
    })
    .catch((error: Error) => {
      console.log(error);
      response(res, 500, error);
    });
};
