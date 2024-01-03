import { OK, BAD_REQUEST, INTERNAL_SERVER_ERROR } from '#src/utils/response';
import { COMPANY_ID } from '#src/config/index';
import Shop from '#src/schemas/shop';
import { validationResult } from 'express-validator';

export const find = async (req, res) => {
  try {
    const { active } = req.query;
    let filters = { company: COMPANY_ID };
    if (active) filters.isActive = active;
    const shops = await Shop.find(filters).select(
      'name description latitude longitude city '
    );
    return res.status(200).json(OK(shops));
  } catch (error) {
    return res.status(500).json(INTERNAL_SERVER_ERROR(error.message));
  }
};
