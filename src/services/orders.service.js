import { OK, BAD_REQUEST, INTERNAL_SERVER_ERROR } from '#src/utils/response';
import Order from '#src/schemas/order';
import admin from 'firebase-admin';
import { COMPANY_ID } from '#src/config/index';
import { validationResult } from 'express-validator';

export const findById = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json(BAD_REQUEST(errors.array()));
    }
    const { _id } = req.params;
    const order = await Order.findById(_id)
      .select('-createdAt -updatedAt -company')
    return res.status(200).json(OK(order));
  }
  catch (error) {
    console.log(error)
    return res.status(500).json(INTERNAL_SERVER_ERROR(error.message));
  }
}

export const save = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json(BAD_REQUEST(errors.array()));
    }
    const { _id, cart, address, email, phone, name, comment, paymentMethod} = req.body;
    const { uid } = req;

    const order = !!_id
                  ? await Order.findById(_id)
                  : new Order();
    order.cart = cart;
    order.address = address;
    order.uid = uid;
    order.email = email;
    order.phone = phone;
    order.name = name;
    order.comment = comment;
    order.paymentMethod = paymentMethod;
    await order.save();
    return res.status(201).json(OK());
  } catch (error) {
    console.log(error)
    return res.status(500).json(INTERNAL_SERVER_ERROR(error.message));
  }
}