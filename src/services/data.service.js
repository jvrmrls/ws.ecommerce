import { OK, BAD_REQUEST, INTERNAL_SERVER_ERROR } from '#src/utils/response';
import Product from '#src/schemas/product';
import Category from '#src/schemas/category';
import Company from '#src/schemas/company';
import Carousel from '#src/schemas/carousel';
import Message from '#src/schemas/message';
import Option from '#src/schemas/option';
import Offer from '#src/schemas/offer';
import Shop from '#src/schemas/shop';
import { COMPANY_ID } from '#src/config/index';
import admin from 'firebase-admin';

export const getData = async (req, res) => {
  try {
    const menu = await Product.find({ company: COMPANY_ID, isActive: true })
      .select(
        'name description price category options order urlName isNew tags'
      )
      .sort({ order: 1 })
      .populate({
        path: 'options',
        select: 'label options',
        populate: {
          path: 'options',
          select: 'option aditionalPrice order',
          options: { sort: { order: 1 } },
          populate: {
            path: 'option',
            select: 'name cartName'
          }
        }
      });
    const categories = await Category.find({
      company: COMPANY_ID,
      isActive: true
    })
      .select('name description order')
      .sort({ order: 1 });
    const carousels = await Carousel.find({
      company: COMPANY_ID,
      isActive: true
    }).select('redirection reference order');
    const messages = await Message.find({
      company: COMPANY_ID,
      isActive: true
    }).select(' text startHour endHour days');
    const company = await Company.findOne({ _id: COMPANY_ID });
    const options = await Option.find({
      company: COMPANY_ID,
      isActive: true
    })
      .sort({ name: 1 })
      .select('name cartName group');
    const offers = await Offer.find({ company: COMPANY_ID, isActive: true })
      .sort({ from: 1 })
      .select('-company -isActive -createdAt -updatedAt -__v');
    const shops = await Shop.find({ company: COMPANY_ID, isActive: true })
      .sort({ name: 1 })
      .select('-company -isActive -createdAt -updatedAt -__v');
    return res
      .status(200)
      .json(
        OK({
          menu,
          categories,
          options,
          carousels,
          messages,
          offers,
          shops,
          company
        })
      );
  } catch (error) {
    console.log(error);
    return res.status(500).json(INTERNAL_SERVER_ERROR(error.message));
  }
};

export const getDataUser = async (req, res) => {
  try {
    const { user } = req;
    const { uid, email, displayName, photoURL, providerData } = await admin
      .auth()
      .getUser(user);

    const providers = providerData?.reduce((acc, provider) => {
      acc.push(provider.providerId);
      return acc;
    }, []);

    const response = {
      uid,
      email,
      name: displayName,
      profilePicture: photoURL,
      providers
    };
    return res.status(200).json(OK(response));
  } catch (error) {
    console.log(error);
    return res.status(500).json(INTERNAL_SERVER_ERROR(error.message));
  }
};
