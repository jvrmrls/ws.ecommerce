import { OK, BAD_REQUEST, INTERNAL_SERVER_ERROR } from '#src/utils/response';
import Product from '#src/schemas/product';
import Category from '#src/schemas/category';
import Company from '#src/schemas/company';
import Image from '#src/schemas/image';
import Carousel from '#src/schemas/carousel';
import Message from '#src/schemas/message';
import Option from '#src/schemas/option';
import { COMPANY_ID } from '#src/config/index';

export const getData = async (req, res) => {
  try {
    const menu = await Product.find({ company: COMPANY_ID, isActive: true })
      .select('name description price category options order')
      .populate({
      path: 'options',
      select: 'label options',
      populate: {
        path: 'options',
        select: 'option aditionalPrice order',
        populate: {
          path: 'option',
          select: 'name'
        }
      }
    });
    const categories = await Category.find({ company: COMPANY_ID, isActive: true })
      .select('name description order')
    ;
    const carousels = await Carousel.find({
      company: COMPANY_ID,
      isActive: true
    })
      .select('redirection reference order')
    const messages = await Message.find({
      company: COMPANY_ID,
      isActive: true
    })
      .select(' text startHour endHour days')
    const company = await Company.findOne({ _id: COMPANY_ID });
    return res
      .status(200)
      .json(OK({ menu, categories, carousels, messages, company }));
  } catch (error) {
    console.log(error);
    return res.status(500).json(INTERNAL_SERVER_ERROR(error.message));
  }
};
