import { Article } from '../../models/Article';
import { response } from '../utils';

export const deleteArticleById = (req, res) => {
    const { id } = req.params;

    Article
        .deleteOne({ _id: id })
        .exec()
        .then(log => {
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
        .catch(error => {
            console.log(error);
            response(res, 500, error);
        });
};
