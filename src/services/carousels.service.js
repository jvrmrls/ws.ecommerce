import { OK, BAD_REQUEST, INTERNAL_SERVER_ERROR } from '#src/utils/response';
import { COMPANY_ID } from '#src/config/index';
import Carousel from '#src/schemas/carousel';
import multer from 'multer';

const upload = multer({});

export const find = async (req, res) => {
  try {
    const carousels = await Carousel.find({
      company: COMPANY_ID,
      isActive: true
    });
    return res.status(200).json(OK(carousels));
  } catch (error) {
    return res.status(500).json(INTERNAL_SERVER_ERROR(error.message));
  }
};

export const create = async (req, res) => {
  try {
    const carousel = req.body;
    const savedCarousel = await Carousel.create(carousel);
    return res.status(201).json(OK(savedCarousel));
  } catch (error) {
    return res.status(500).json(INTERNAL_SERVER_ERROR(error.message));
  }
};
