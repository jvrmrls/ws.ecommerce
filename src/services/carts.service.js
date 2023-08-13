import { OK, BAD_REQUEST, INTERNAL_SERVER_ERROR } from '#src/utils/response';
import { COMPANY_ID } from '#src/config/index';
import Cart from '#src/schemas/cart';
import CartDetail from '#src/schemas/cartDetail';
import CartDetailOption from '#src/schemas/cartDetailOption';
import { v4 as uuidv4 } from 'uuid';

export const find = async (req, res) => {
  try {
    const carts = await Cart.find({
      uid: req.user.uid,
      company: COMPANY_ID
    }).populate({
      path: 'products',
      populate: {
        path: 'product',
        populate: {
          path: 'options',
          populate: {
            path: 'options',
            populate: {
              path: 'option'
            }
          }
        }
      },
      populate: {
        path: 'options'
      }
    });
    return res.status(200).json(OK(carts));
  } catch (error) {
    return res.status(500).json(INTERNAL_SERVER_ERROR(error.message));
  }
};

export const findByCode = async (req, res) => {
  try {
    const { code } = req.params;
    const cart = await Cart.findOne({
      code,
      company: COMPANY_ID
    }).populate({
      path: 'products',
      populate: {
        path: 'product',
        populate: {
          path: 'options',
          populate: {
            path: 'options',
            populate: {
              path: 'option'
            }
          }
        }
      }
    });
    if (!cart) {
      return res.status(400).json(BAD_REQUEST('Cart not found'));
    }
    return res.status(200).json(OK(cart));
  } catch (error) {
    return res.status(500).json(INTERNAL_SERVER_ERROR(error.message));
  }
};

export const create = async (req, res) => {
  try {
    // const cart = await Cart.create({
    //   user: req.user._id,
    //   company: COMPANY_ID
    // });
    const { status, visibility, products } = req.body;
    // Save an empty cart
    const cart = await Cart.create({
      code: uuidv4(),
      status,
      visibility,
      uid: req?.user?.uid || null,
      products: []
    });
    // Save cart details
    for (const product of products) {
      console.log(product);
      // Save an empty cart detail
      const cartDetail = await CartDetail.create({
        cart: cart?._id,
        product: product?._id,
        quantity: product?.quantity,
        order: product?.order,
        options: []
      });
      // Save cart detail options
      for (const option of product?.options) {
        const cartDetailOption = await CartDetailOption.create({
          cartDetail: cartDetail?._id,
          option: option?._id,
          selected: option?.selected
        });
        cartDetail?.options?.push(cartDetailOption?._id);
      }
      cartDetail.save();
      cart?.products?.push(cartDetail?._id);
    }
    cart.save();
    return res.status(200).json(OK(cart));
  } catch (error) {
    return res.status(500).json(INTERNAL_SERVER_ERROR(error.message));
  }
};

export const clone = async (req, res) => {
  try {
    const { code } = req.params;
    const cart = await Cart.findOne({ code });
    if (!cart) {
      return res.status(400).json(BAD_REQUEST('Cart not found'));
    }
    const clonedCart = await Cart.create({
      code: uuidv4(),
      status: cart?.status,
      visibility: cart?.visibility,
      uid: req?.user?.uid || null,
      products: []
    });
    for (const product of cart?.products) {
      const clonedProduct = await CartDetail.findById(product);
      const clonedCartDetail = await CartDetail.create({
        cart: clonedCart?._id,
        product: clonedProduct?.product,
        quantity: clonedProduct?.quantity,
        order: clonedProduct?.order,
        options: []
      });
      for (const option of clonedProduct?.options) {
        const clonedOption = await CartDetailOption.findById(option);
        const clonedCartDetailOption = await CartDetailOption.create({
          cartDetail: clonedCartDetail?._id,
          option: clonedOption?.option,
          selected: clonedOption?.selected
        });
        clonedCartDetail?.options?.push(clonedCartDetailOption?._id);
      }
      clonedCartDetail.save();
      clonedCart?.products?.push(clonedCartDetail?._id);
    }
    clonedCart.save();
    return res.status(200).json(OK(clonedCart));
  } catch (error) {
    return res.status(500).json(INTERNAL_SERVER_ERROR(error.message));
  }
};

export const remove = async (req, res) => {
  try {
    const { id } = req.params;
    const cart = await Cart.findById(id);
    if (!cart) {
      return res.status(400).json(BAD_REQUEST('Cart not found'));
    }
    await cart.deleteOne();
    return res.status(200).json(OK(cart));
  } catch (error) {
    return res.status(500).json(INTERNAL_SERVER_ERROR(error.message));
  }
};

export const removeAll = async (req, res) => {
  try {
    const carts = await Cart.find({
      uid: req.user.uid,
      company: COMPANY_ID
    });
    for (const cart of carts) {
      await cart.deleteOne();
    }
    return res.status(200).json(OK(carts));
  } catch (error) {
    return res.status(500).json(INTERNAL_SERVER_ERROR(error.message));
  }
};
