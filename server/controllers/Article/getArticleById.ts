import { Request, Response } from 'express';

import { Article } from '../../models';
import { response } from '../utils';

export const getArticleById = (req: Request, res: Response) => {
    const { id } = req.params;

    Article.findById(id)
        .exec()
        .then(data => {
            if (data) {
                response(res, 200, {
                    message: `Found article with current ID: ${id}`,
                    data
                });
            } else {
                response(res, 200, { message: `No valid entry found by ID  ${id}` });
            }
        })
        .catch((error: Error) => {
            console.log(error);
            response(res, 500, error);
        });
};
