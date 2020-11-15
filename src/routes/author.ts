import { Request, Response } from 'express';
import { fetchAuthorData } from '../utils/fetchAuthorData';
import {
  sendFailureResponse,
  sendSuccessResponse,
} from '../utils/sendResponse';

export async function author(req: Request, res: Response) {
  try {
    const authorRes = await fetchAuthorData(req.params.id);
    sendSuccessResponse('author', authorRes, res);
  } catch (error) {
    sendFailureResponse(error, res);
  }
}
