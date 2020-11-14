import { Request, Response } from 'express';
import getURLSuffix from '../utils/getURLSuffix';
import { fetchData } from '../utils/fetchData';
import { parseAuthor } from '../utils/parserAuthor';

export const author = (req: Request, res: Response) => {
  const urlSuffix = getURLSuffix.author(req.params.id as string);

  fetchData(urlSuffix, 'author', parseAuthor, res);
};
