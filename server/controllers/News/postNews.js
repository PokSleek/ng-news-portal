import mongoose from 'mongoose';
import isEmpty from 'lodash/isEmpty';

import { News } from '../../models/News/News';

import { error, getUncorrectedFields } from './utils';
import { newsSchema } from '../../models/News/constants'



export const postNews = (req, res) => {
    const { data } = req.body;

    const article = new News({
        _id: new mongoose.Types.ObjectId(),
        source: {
            id: data.source.id || '',
            name: data.source.name || '',
        },
        author: data.author || '',
        title: data.title || '',
        description: data.description || '',
        url: data.url || '',
        urlToImage: data.urlToImage || '',
        publishedAt: data.publishedAt || '',
        content: data.content || '',
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
            error(err);
        });
};
