import { getAPIData } from '../utils/get-api-data';
import { parseList } from '../utils/parsers';

export const bookList = (req, res) =>
  getAPIData({
    urlSuffix: `search?q=${req.query.q}`,
    apiPropName: 'search',
    parseFunction: parseList,
    res
  });
