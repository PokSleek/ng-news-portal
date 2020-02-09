import { News } from '../../models/News/News';

export const getNews = (req, res) => {
    News
        .find()
        .exec()
        .then(data => {
            if (data.length) {
                res.status(200).json({
                    message: 'All entries found',
                    length: data.length,
                    data,
                });
            } else {
                res.status(404).json({
                    message: 'No entries found'
                })
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: err });
        })
};
