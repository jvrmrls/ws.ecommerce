import { OK, BAD_REQUEST, INTERNAL_SERVER_ERROR } from '#src/utils/response';
import { COMPANY_ID } from '#src/config/index';
import Category from '#src/schemas/category';

export const find = async (req, res) => {
  try {
    const { active } = req.query;
    let filters = { company: COMPANY_ID };
    if (active) filters.isActive = active;
    const categories = await Category.find(filters);
    return res.status(200).json(OK(categories));
  } catch (error) {
    return res.status(500).json(INTERNAL_SERVER_ERROR(error.message));
  }
};

export const create = async (req, res) => {
  try {
    const category = req.body;
    const savedCategory = await Category.create(category);
    return res.status(200).json(OK(savedCategory));
  } catch (error) {
    return res.status(500).json(INTERNAL_SERVER_ERROR(error.message));
  }
};

export const remove = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedCategory = await Category.findById(id);
    if (!deletedCategory) {
      return res.status(400).json(BAD_REQUEST('The category does not exist'));
    }
    await deletedCategory.deleteOne();
    return res.status(200).json(OK(deletedCategory));
  } catch (error) {
    return res.status(500).json(INTERNAL_SERVER_ERROR(error.message));
  }
};
