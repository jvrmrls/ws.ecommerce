import { OK, BAD_REQUEST, INTERNAL_SERVER_ERROR } from '#src/utils/response';

export const getData = async (req, res) => {
  try {
    res.status(200).json(OK('Hello World'));
  } catch (error) {
    res.status(500).json(INTERNAL_SERVER_ERROR(error.message));
  }
};
