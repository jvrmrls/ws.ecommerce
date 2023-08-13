import { COMPANY_ID } from '#src/config/index';
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';

export const upload = async (file, size) => {
  try {
    const fileBase64 = file.buffer.toString('base64');
    const key = `${uuidv4()}_${COMPANY_ID}`;
    const params = {
      fileBase64,
      filename: key,
      originalFilename: file.originalname,
      size
    };
    const uploadedFile = await axios.post(
      `${process.env.IMAGES_SERVER}`,
      params
    );
    return uploadedFile?.data;
  } catch (error) {
    console.log(error);
  }
};
