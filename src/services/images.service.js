import { OK, BAD_REQUEST, INTERNAL_SERVER_ERROR } from '#src/utils/response';
import { COMPANY_ID } from '#src/config/index';
import { upload } from '#src/utils/images';
import Image from '#src/schemas/image';

export const find = async (req, res) => {
  try {
  } catch (error) {
    return res.status(500).json(INTERNAL_SERVER_ERROR(error.message));
  }
};

export const create = async (req, res) => {
  try {
    const image = req.file;
    const imageExtension = image?.originalname?.split('.')?.pop();
    const details = req.body;
    if (!image) {
      return res.status(400).json(BAD_REQUEST('No image provided'));
    }
    const uploadedFile = await upload(image, details?.size);
    console.log('UPLOADED FILE', uploadedFile);
    const savedImage = await Image.create({
      type: details?.type,
      extension: imageExtension,
      size: details?.size,
      reference: details?.reference,
      url: uploadedFile?.url,
      key: uploadedFile?.key,
      height: uploadedFile?.height,
      width: uploadedFile?.width
    });
    return res.status(201).json(OK(savedImage));
  } catch (error) {
    return res.status(500).json(INTERNAL_SERVER_ERROR(error.message));
  }
};
