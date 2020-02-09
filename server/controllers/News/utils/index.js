import pickBy from 'lodash/pickBy';

export const getUncorrectedFields = (data, schema) =>
    pickBy(data, (value, index) => typeof value !== schema[index]);
