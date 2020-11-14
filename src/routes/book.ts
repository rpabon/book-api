import { Request, Response } from 'express';
import { fetchData } from '../utils/fetchData';
import getURLSuffix from '../utils/getURLSuffix';
import { parseBook } from '../utils/parseBook';

export const book = (req: Request, res: Response) => {
  const urlSuffix = getURLSuffix.book(req.params.id as string);

  fetchData(urlSuffix, 'book', parseBook, res);
};
