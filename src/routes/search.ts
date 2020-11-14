import { Request, Response } from 'express';
import { fetchData } from '../utils/fetchData';
import { parseList } from '../utils/parseList';
import getSearchURLSuffix from '../utils/getURLSuffix';

export function search(req: Request, res: Response) {
  const urlSuffix = getSearchURLSuffix.search(req.query.q as string);

  fetchData(urlSuffix, 'search', parseList, res);
}
