import { OK, BAD_REQUEST, INTERNAL_SERVER_ERROR } from '#src/utils/response';
import Image from '#src/schemas/image';
import { COMPANY_ID } from '#src/config/index';

export const getImages = async (req, res) => {
  try {
    const images = await Image.find({ company: COMPANY_ID });
    return res.status(200).json(OK(images));
  } catch (error) {
    return res.status(500).json(INTERNAL_SERVER_ERROR(error.message));
  }
};
