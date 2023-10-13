import { OK, BAD_REQUEST, INTERNAL_SERVER_ERROR } from '#src/utils/response';
import Preference from '#src/schemas/preference';
import admin from 'firebase-admin';
import { COMPANY_ID } from '#src/config/index';
import { validationResult } from 'express-validator';

export const find = async (req, res) => {
  try {
    const preferences = await Preference.find({
      uid: req.uid,
      company: COMPANY_ID
    }).select('-createdAt -updatedAt -company -uid');
    return res.status(200).json(OK(preferences));
  } catch (error) {
    return res.status(500).json(INTERNAL_SERVER_ERROR(error.message));
  }
};

export const create = async (req, res) => {
  try {
    const { code, value } = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json(BAD_REQUEST(errors.array()));
    }
    //* Verify if the preference already exists
    const preferenceExists = await Preference.findOne({
      code,
      uid: req.uid,
      company: COMPANY_ID
    });
    if (preferenceExists) {
      // Add to the array of values, the new value
      preferenceExists.value.push(value);
      await preferenceExists.save();
      return res.status(201).json(OK(preferenceExists));
    }
    const preference = await Preference.create({
      code,
      value: [value],
      uid: req.uid
    });
    return res.status(201).json(OK(preference));
  } catch (error) {
    return res.status(500).json(INTERNAL_SERVER_ERROR(error.message));
  }
};

export const update = async (req, res) => {
  try {
    const { id } = req.params;
    const { code, value } = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json(BAD_REQUEST(errors.array()));
    }
    const preference = await Preference.findOneAndUpdate(
      { _id: id, uid: req.uid, company: COMPANY_ID },
      {
        code,
        value
      },
      { new: true }
    );
    return res.status(200).json(OK(preference));
  } catch (error) {
    return res.status(500).json(INTERNAL_SERVER_ERROR(error.message));
  }
};

export const remove = async (req, res) => {
  try {
    const { id } = req.params;
    const { value } = req.body;
    // Verify if value is not empty, means that the user wants to remove a value from the array
    if (value) {
      const preference = await Preference.findOneAndUpdate(
        { _id: id, uid: req.uid, company: COMPANY_ID },
        {
          $pull: { value }
        },
        { new: true }
      );
      return res.status(200).json(OK(preference));
    }
    // If value is empty, means that the user wants to remove the preference
    await Preference.findOneAndDelete({
      _id: id,
      uid: req.uid,
      company: COMPANY_ID
    });
    return res.status(200).json(OK());
  } catch (error) {
    return res.status(500).json(INTERNAL_SERVER_ERROR(error.message));
  }
};
