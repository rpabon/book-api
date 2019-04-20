import { getAPIData } from '../utils/get-api-data';
import { parseBook } from '../utils/parsers';

export const bookSingle = (req, res) =>
  getAPIData({
    urlSuffix: `book/show/${req.params.id}`,
    apiPropName: 'book',
    parseFunction: parseBook,
    res
  });
