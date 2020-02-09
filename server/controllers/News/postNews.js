import mongoose from 'mongoose';
import isEmpty from 'lodash/isEmpty';

import { News } from '../../models/News/News';

import { getUncorrectedFields } from './utils';
import { newsSchema } from '../../models/News/constants'



export const postNews = (req, res) => {
    const { data } = req.body;

    const uncorrectedFields = getUncorrectedFields(data, newsSchema);
    if (!isEmpty(uncorrectedFields)) {
        return res.status(400).json({
            message: 'Bad request: uncorrected fields',
            uncorrectedFields,
        });
    }

    const article = new News({
        _id: new mongoose.Types.ObjectId(),
        category: data.category,
        country: data.country,
        description: data.description,
        id: data.id,
        language: data.language,
        name: data.name,
        url: data.url,
    });

    article
        .save()
        .then(data => {
            res.status(200).json({
                message: 'Added next News article to DB',
                data,
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: err });
        });
};
