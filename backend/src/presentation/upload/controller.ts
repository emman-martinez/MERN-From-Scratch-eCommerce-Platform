import { Request, Response } from 'express';

export class UploadController {
  async uploadFile(req: Request, res: Response) {
    res.send({ message: 'File uploaded successfully', image: `${req.file?.path}` });
  }
}
