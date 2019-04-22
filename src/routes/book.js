import { getAPIData } from '../utils/getAPIData';
import { parseBook } from '../utils/parsers';

export const book = (req, res) =>
  getAPIData({
    urlSuffix: `book/show/${req.params.id}`,
    apiPropName: 'book',
    parseFunction: parseBook,
    res
  });
