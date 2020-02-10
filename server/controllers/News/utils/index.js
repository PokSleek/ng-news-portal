import pickBy from 'lodash/pickBy';

export const getUncorrectedFields = (data, schema) =>
    pickBy(data, (value, index) => index !== 'source' ? typeof value !== schema[index] : false);
