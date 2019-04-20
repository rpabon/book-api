import { getAPIData } from '../utils/get-api-data';
import { parseAuthor } from '../utils/parsers';

export const author = (req, res) =>
  getAPIData({
    urlSuffix: `author/show/${req.params.id}`,
    apiPropName: 'author',
    parseFunction: parseAuthor,
    res
  });
