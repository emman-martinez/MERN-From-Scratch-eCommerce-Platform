import { Request, Response } from 'express';
import { uploadImageToCloudinary } from '../../utils/cloudinary.ts';

export class UploadController {
  async uploadFile(req: Request, res: Response) {
    if (!req.file) {
      return res.status(400).send({ message: 'Image file is required' });
    }

    const uploadedImage = await uploadImageToCloudinary(req.file.buffer);

    res.send({ message: 'File uploaded successfully', image: uploadedImage.secure_url });
  }
}
