import { Request, Response } from 'express';

import { Article } from '../../models';
import { IArticleModel } from '../../models/interfaces';
import { response } from '../utils';

export const getArticles = async (req: Request, res: Response) => {
    const { q } = req.query;
    const limit = Number(req.query.limit);
    const skip = Number(req.query.skip);

    const condition = q ? { 'title': { '$regex': q, '$options': 'i' } } : {};
    const totalResults = await Article.countDocuments(condition);

    Article
        .find(condition, null, {
            limit,
            skip,
        })
        .exec()
        .then((data: Array<IArticleModel>) => {

            const message = data.length
                ? 'All entries found'
                : 'No entries found';

            response(res, 200, {
                message,
                data,
                totalResults,
                limit,
                skip,
            });
        })
        .catch(error => {
            console.log(error);
            response(res, 500, error);
        });
};
