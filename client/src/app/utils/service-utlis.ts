import { stringify } from 'querystring';
import isString from 'lodash/isString';

export const urlBuilder = (defaultUrl: string) =>
  (param?: string, query?: string) => {
    let url = defaultUrl;
    if (param) url = `${url}/${param}`;
    if (query) {
      if (isString(url)) url = `${url}?${query}`;
      else url = `${url}${stringify(query)}`;
    }
    return url;
  };
