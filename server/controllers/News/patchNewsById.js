import { News } from '../../models/News/News';
import { response } from '../utils';


export const patchNewsById = (req, res) => {
    const { id } = req.params;
    const { data } = req.body;

    News
        .updateOne({ _id: id }, { $set: data }, { runValidators: true })
        .exec()
        .then((log) => {
            const { n, nModified } = log;

            let message;
            let statusCode;
            if (!n) {
                message = `No valid entry found by ID ${id}`;

            } else {
                if (!nModified) {
                    message = `No any fields modified in the article by ID ${id}`;
                } else {
                    message = `Updated article with current ID: ${id}`;
                }
            }

            return response(res, 200, {
                message,
                totalResults: n,
                modified: nModified,
            });
        })
        .catch(error => {
            console.log(error);
            response(res, 500, error);
        })
};
