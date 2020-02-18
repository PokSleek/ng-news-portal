import { News } from '../../models/News/News';
import { response } from '../utils';

export const getNews = async (req, res) => {
    const { q } = req.query;
    const limit = Number(req.query.limit);
    const skip = Number(req.query.skip);

    const condition = q ? { 'title': { '$regex': q, '$options': 'i' } } : {};
    const totalResults = await News.countDocuments(condition);

    News
        .find(condition, null, {
            limit,
            skip,
        })
        .exec()
        .then(data => {

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
