import { Request, Response } from 'express';
import { fetchData } from '../utils/fetchData';
import { parseList } from '../utils/parseList';

export function search(req: Request, res: Response) {
  const { q } = req.query;
  const urlSuffix: string = `search${q ? `?q=${q}` : ''}`;

  fetchData(urlSuffix, 'search', parseList, res);
}
