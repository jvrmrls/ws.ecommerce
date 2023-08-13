import { OK, BAD_REQUEST, INTERNAL_SERVER_ERROR } from '#src/utils/response';
import Product from '#src/schemas/product';
import Category from '#src/schemas/category';
import Company from '#src/schemas/company';
import Image from '#src/schemas/image';
import Carousel from '#src/schemas/carousel';
import { COMPANY_ID } from '#src/config/index';

export const getData = async (req, res) => {
  try {
    const products = await Product.find({ company: COMPANY_ID }).populate({
      path: 'options',
      populate: {
        path: 'options',
        populate: {
          path: 'option'
        }
      }
    });
    const categories = await Category.find({ company: COMPANY_ID });
    const carousels = await Carousel.find({
      company: COMPANY_ID,
      isActive: true
    });
    const images = await Image.find({ company: COMPANY_ID });
    const company = await Company.findOne({ _id: COMPANY_ID });
    return res
      .status(200)
      .json(OK({ products, categories, carousels, images, company }));
  } catch (error) {
    return res.status(500).json(INTERNAL_SERVER_ERROR(error.message));
  }
};
