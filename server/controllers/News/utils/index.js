import pickBy from 'lodash/pickBy';

export const getUncorrectedFields = (data, schema) =>
    pickBy(data, (value, index) => index !== 'source' ? typeof value !== schema[index] : false);

export const error = (res, err) => res.status(500).json({ error: err });

export const response = (res, statusCode, body) => res.status(statusCode).json(body);

export const newsBodyBuilder = (message, totalResults = 0, data = []) => ({
    message,
    totalResults,
    data
});
