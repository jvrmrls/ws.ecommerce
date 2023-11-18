import { OK, BAD_REQUEST, INTERNAL_SERVER_ERROR } from '#src/utils/response';
import FavoriteProduct from '#src/schemas/favoriteProduct';
import admin from 'firebase-admin';
import { COMPANY_ID } from '#src/config/index';
import { validationResult } from 'express-validator';

export const find = async (req, res) => {
  try {
    const favoriteProducts = await FavoriteProduct.find({
      uid: req?.uid,
      company: COMPANY_ID
    }).select('-createdAt -updatedAt -company -uid');

    return res.status(200).json(OK(favoriteProducts));
  } catch (error) {
    return res.status(500).json(INTERNAL_SERVER_ERROR(error.message));
  }
};

export const create = async (req, res) => {
  try {
    const { product } = req?.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json(BAD_REQUEST(errors.array()));
    }
    const favoriteProduct = await FavoriteProduct.create({
      product,
      uid: req?.uid
    });
    return res.status(201).json(OK(favoriteProduct));
  } catch (error) {
    return res.status(500).json(INTERNAL_SERVER_ERROR(error.message));
  }
};

export const remove = async (req, res) => {
  try {
    const { id } = req?.params;
    const favoriteProduct = await FavoriteProduct.findOneAndDelete({
      product: id,
      uid: req?.uid
    });
    if (!favoriteProduct) {
      return res.status(400).json(BAD_REQUEST('Favorite product not found'));
    }
    return res.status(200).json(OK(favoriteProduct));
  } catch (error) {
    return res.status(500).json(INTERNAL_SERVER_ERROR(error.message));
  }
};
