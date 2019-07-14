import { Request, Response } from 'express';
import { fetchData } from '../utils/fetchData';
import { parseBook } from '../utils/parseBook';

export const book = (req: Request, res: Response) => {
  fetchData(`book/show/${req.params.id}`, 'book', parseBook, res);
};
