import { Request, Response } from 'express';
import { fetchSearchData } from '../utils/fetchSearchData';
import {
  sendFailureResponse,
  sendSuccessResponse,
} from '../utils/sendResponse';

export async function search(req: Request, res: Response) {
  try {
    const bookInfos = await fetchSearchData(req.query.q as string);

    sendSuccessResponse('search', bookInfos, res);
  } catch (error) {
    sendFailureResponse(error, res);
  }
}
