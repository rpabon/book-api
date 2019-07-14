import { Request, Response } from 'express';
import { fetchData } from '../utils/fetchData';
import { parseAuthor } from '../utils/parserAuthor';

export const author = (req: Request, res: Response) => {
  fetchData(`author/show/${req.params.id}`, 'author', parseAuthor, res);
};
