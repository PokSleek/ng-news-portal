import { Types } from 'mongoose';

import { News } from '../../models/News/News';
import { response } from '../utils';


export const postNews = (req, res) => {
    const { data } = req.body;

    const article = new News({
        _id: new Types.ObjectId(),
        source: {
            id: data.source.id,
            name: data.source.name,
        },
        author: data.author,
        title: data.title,
        description: data.description,
        url: data.url,
        urlToImage: data.urlToImage,
        publishedAt: data.publishedAt,
        content: data.content,
    });

    article
        .save()
        .then(data => {
            response(res, 201, {
                message: 'Added next News article to DB',
                data,
            });
        })
        .catch(error => {
            console.log(error);
            response(res, 500, error);
        });
};
