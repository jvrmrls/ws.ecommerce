import { OK, BAD_REQUEST, INTERNAL_SERVER_ERROR } from '#src/utils/response';
import { COMPANY_ID } from '#src/config/index';
import Option from '#src/schemas/option';

export const create = async (req, res) => {
  try {
    const option = req.body;
    const savedOption = await Option.create({ ...option, company: COMPANY_ID });
    return res.status(200).json(OK(savedOption));
  } catch (error) {
    return res.status(500).json(INTERNAL_SERVER_ERROR(error.message));
  }
};
