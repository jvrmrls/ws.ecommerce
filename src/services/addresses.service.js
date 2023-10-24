import { OK, BAD_REQUEST, INTERNAL_SERVER_ERROR } from '#src/utils/response';
import Address from '#src/schemas/address';
import admin from 'firebase-admin';
import { COMPANY_ID } from '#src/config/index';
import { validationResult } from 'express-validator';

export const find = async (req, res) => {
  try {
    const addresses = await Address.find({
      uid: req.uid,
      company: COMPANY_ID
    }).select('-createdAt -updatedAt -company -uid');
    return res.status(200).json(OK(addresses));
  } catch (error) {
    return res.status(500).json(INTERNAL_SERVER_ERROR(error.message));
  }
};

export const create = async (req, res) => {
  try {
    const { name, longitude, latitude, street, houseNumber, reference } =
      req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json(BAD_REQUEST(errors.array()));
    }
    const address = await Address.create({
      name,
      longitude,
      latitude,
      street,
      houseNumber,
      reference,
      uid: req.uid
    });
    return res.status(201).json(OK(address));
  } catch (error) {
    return res.status(500).json(INTERNAL_SERVER_ERROR(error.message));
  }
};

export const update = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, longitute, latitude, street, houseNumber, reference } =
      req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json(BAD_REQUEST(errors.array()));
    }
    const address = await Address.findOneAndUpdate(
      { _id: id, uid: req.uid, company: COMPANY_ID },
      {
        name,
        longitute,
        latitude,
        street,
        houseNumber,
        reference
      },
      { new: true }
    );
    if (!address) {
      return res.status(400).json(BAD_REQUEST('Address not found'));
    }
    return res.status(200).json(OK(address));
  } catch (error) {
    return res.status(500).json(INTERNAL_SERVER_ERROR(error.message));
  }
};

export const remove = async (req, res) => {
  try {
    const { id } = req.params;
    const address = await Address.findOneAndDelete({
      _id: id,
      uid: req.uid,
      company: COMPANY_ID
    });
    if (!address) {
      return res.status(400).json(BAD_REQUEST('Address not found'));
    }
    return res.status(200).json(OK(address));
  } catch (error) {
    return res.status(500).json(INTERNAL_SERVER_ERROR(error.message));
  }
};
