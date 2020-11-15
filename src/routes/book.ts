import { Request, Response } from 'express';
import { fetchBookData } from '../utils/fetchBookData';
import {
  sendSuccessResponse,
  sendFailureResponse,
} from '../utils/sendResponse';

export async function book(req: Request, res: Response) {
  try {
    const bookRes = await fetchBookData(req.params.id);
    sendSuccessResponse('book', bookRes, res);
  } catch (error) {
    sendFailureResponse(error, res);
  }
}
