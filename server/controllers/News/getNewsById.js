import { News } from '../../models/News/News';
import { response } from '../utils';

export const getNewsById = (req, res) => {
    const { id } = req.params;

    News.findById(id)
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
        .catch(error => {
            console.log(error);
            response(res, 500, error);
        });
};
