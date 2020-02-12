import { News } from "../../models/News/News";
import { error } from './utils';

export const getNewsById = (req, res) => {
    const { id } = req.params;

    News.findById(id)
        .exec()
        .then(data => {
            if (data) {
                res.status(200).json({
                    message: `Found article with current ID: ${id}`,
                    data,
                });
            } else {
                res.status(404).json({ message: `No valid entry found by ID  ${id}` });
            }
        })
        .catch(err => {
            console.log(err);
            error(err);
        });
};
