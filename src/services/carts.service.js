import { BAD_REQUEST, INTERNAL_SERVER_ERROR, OK } from '#src/utils/response';
import { COMPANY_ID } from '#src/config/index';
import Cart from '#src/schemas/cart';
import CartDetail from '#src/schemas/cartDetail';
import CartDetailOption from '#src/schemas/cartDetailOption';
import Product from '#src/schemas/product';
import ProductOptionGroup from '#src/schemas/productOptionGroup';
import ProductOption from '#src/schemas/productOption';
import Option from '#src/schemas/option';
import { v4 as uuidv4 } from 'uuid';
import { validationResult } from 'express-validator';

export const find = async (req, res) => {
  try {
    //* Get all carts of this user
    const carts = await Cart.find({
      uid: req?.uid,
      company: COMPANY_ID
    })
      .select('-createdAt -updatedAt -company -uid')
      .populate({
        path: 'menu',
        select: '-createdAt -updatedAt -cart -_id',
        populate: {
          path: 'options',
          select: '-createdAt -updatedAt -cartDetail -_id'
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
    })
      .select('-createdAt -updatedAt -company -uid')
      .populate({
        path: 'menu',
        select: '-createdAt -updatedAt -cart -_id',
        populate: {
          path: 'options',
          select: '-createdAt -updatedAt -cartDetail -_id'
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

export const save = async (req, res) => {
  try {
    // const cart = await Cart.create({
    //   user: req.user._id,
    //   company: COMPANY_ID
    // });
    const { _id, status, visibility, menu, name } = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json(BAD_REQUEST(errors.array()));
    }
    let cart = await Cart.findById(_id);
    // Remove the cart if the menu is empty and cart exists
    if (menu?.length === 0 && !!cart) {
      await cart.deleteOne();
      return res.status(200).json(OK(null));
    }
    if (!cart) {
      // Save an empty cart
      cart = await Cart.create({
        name,
        code: uuidv4(),
        status,
        visibility,
        uid: req?.uid || null,
        menu: []
      });
    } else {
      cart.visibility = visibility;
      cart.status = status;
      cart.menu = [];
      cart.save();
      // Delete all the cart details
      await CartDetail.deleteMany({ cart: cart?._id });
    }
    // Save cart details
    for (const product of menu) {
      // Validate the product and the options
      const productIsValid = await validateProduct(product);
      if (!productIsValid) {
        // Continue with the next product
        continue;
      }

      // Save an empty cart detail
      const cartDetail = await CartDetail.create({
        cart: cart?._id,
        product: product?.product,
        quantity: product?.quantity,
        order: product?.order,
        options: []
      });
      // Save cart detail options
      for (const option of product?.options) {
        const cartDetailOption = await CartDetailOption.create({
          cartDetail: cartDetail?._id,
          option: option?.option,
          selected: option?.selected
        });
        cartDetail?.options?.push(cartDetailOption?._id);
      }
      await cartDetail.save();
      cart?.menu?.push(cartDetail?._id);
    }
    await cart.save();
    const populatedCart = await Cart.findById(cart?._id)?.populate({
      path: 'menu',
      select: '-createdAt -updatedAt -cart -_id',
      populate: {
        path: 'options',
        select: '-createdAt -updatedAt -cartDetail -_id'
      }
    });
    return res.status(200).json(OK(populatedCart));
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
      uid: req?.uid || null,
      menu: []
    });
    for (const product of cart?.menu) {
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
      await clonedCartDetail.save();
      clonedCart?.menu?.push(clonedCartDetail?._id);
    }
    await clonedCart.save();
    const populatedCart = await Cart.findById(clonedCart?._id)?.populate({
      path: 'menu',
      select: '-createdAt -updatedAt -cart -_id',
      populate: {
        path: 'options',
        select: '-createdAt -updatedAt -cartDetail -_id'
      }
    });
    return res.status(200).json(OK(populatedCart));
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
      uid: req?.uid,
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

const validateProduct = async (productToValidate) => {
  // Validate if the product exists
  const productInDb = await Product.findById(productToValidate?.product);
  if (!productInDb) {
    return res.status(400).json(BAD_REQUEST('Product not found'));
  }
  // Validate if the product is available
  if (!productInDb?.isActive) {
    return res.status(400).json(BAD_REQUEST('Product not available'));
  }
  for (const optionInProduct of productInDb?.options) {
    // console.log(optionInProduct);
    // Verify if the option group exists
    const productOptionGroupExistsInProduct = productToValidate?.options?.find(
      (option) => option?.option == optionInProduct?.toString()
    );
    if (!productOptionGroupExistsInProduct) {
      return false;
    }
    // Verify if the option selected exists in the option group
    const optionsInProductOptionGroup = await ProductOptionGroup.findById(
      optionInProduct?.toString()
    )?.populate({ path: 'options' });
    const optionSelectedExists = optionsInProductOptionGroup?.options?.find(
      (item) =>
        item?._id?.toString() == productOptionGroupExistsInProduct?.selected
    );
    if (!optionSelectedExists) {
      return false;
    }
    // Verify if the option selected is active
    const optionSelectedIsActive = await Option.findById(
      optionSelectedExists?.option
    )?.select('isActive');
    if (!optionSelectedIsActive?.isActive) {
      return false;
    }
    return true;
  }
};
