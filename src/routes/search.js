import { getAPIData } from '../utils/getAPIData';
import { parseList } from '../utils/parsers';

export const search = (req, res) => {
  const { q } = req.query;
  const query = q ? `?q=${q}` : '';

  getAPIData({
    urlSuffix: `search${query}`,
    apiPropName: 'search',
    parseFunction: parseList,
    res
  });
};
