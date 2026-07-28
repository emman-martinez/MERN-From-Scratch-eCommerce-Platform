import { Request, Response } from 'express';

export class UploadController {
  async uploadFile(req: Request, res: Response) {
    if (!req.file) {
      return res.status(400).send({ message: 'Image file is required' });
    }

    res.send({ message: 'File uploaded successfully', image: `/uploads/${req.file.filename}` });
  }
}
