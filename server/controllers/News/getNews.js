import { News } from '../../models/News/News';
import { newsBodyBuilder, response, error } from './utils';

export const getNews = (req, res) => {
    News
        .find()
        .exec()
        .then(data => {
            if (data.length) {
                response(res, 200, newsBodyBuilder('All entries found', data.length, data));
            } else {
                response(res, 404, newsBodyBuilder('No entries found', data.length, data));
            }
        })
        .catch(err => {
            console.log(err);
            error(err);
        })
};
