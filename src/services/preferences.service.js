import { OK, BAD_REQUEST, INTERNAL_SERVER_ERROR } from '#src/utils/response';
import Preference from '#src/schemas/preference';
import admin from 'firebase-admin';
import { COMPANY_ID } from '#src/config/index';
import { validationResult } from 'express-validator';

export const find = async (req, res) => {
  try {
    const preferences = await Preference.findOne({
      uid: req.uid,
      company: COMPANY_ID
    }).select('-createdAt -updatedAt -company -uid');
    if (preferences) return res.status(200).json(OK(preferences));
    // If the user doesn't have preferences, create them
    const newPreferences = await Preference.create({
      uid: req.uid,
      values: [],
      company: COMPANY_ID
    });
    return res.status(200).json(OK(newPreferences));
  } catch (error) {
    return res.status(500).json(INTERNAL_SERVER_ERROR(error.message));
  }
};

export const addOrRemove = async (req, res) => {
  try {
    const { action } = req?.params;
    const { value } = req.body;

    if (action !== 'add' && action !== 'remove') {
      return res.status(400).json(BAD_REQUEST('Invalid action'));
    }
    //* If the action is add, validate the value is not present in the preferences
    if (action === 'add') {
      const preferences = await Preference.findOne({
        uid: req.uid,
        company: COMPANY_ID
      });
      if (preferences?.values?.includes(value)) {
        return res.status(200).json(OK(preferences));
      }
    }
    //* If the action is remove, validate the value is present in the preferences
    if (action === 'remove') {
      const preferences = await Preference.findOne({
        uid: req.uid,
        company: COMPANY_ID
      });
      if (!preferences?.values?.includes(value)) {
        return res.status(200).json(OK(preferences));
      }
    }

    //* Update or create preferences
    const preferences = await Preference.findOneAndUpdate(
      { uid: req.uid, company: COMPANY_ID },
      {
        [action === 'add' ? '$addToSet' : '$pull']: { values: value }
      },
      { new: true }
    );
    return res.status(200).json(OK(preferences));
  } catch (error) {
    return res.status(500).json(INTERNAL_SERVER_ERROR(error.message));
  }
};
