import { OK, BAD_REQUEST, INTERNAL_SERVER_ERROR } from '#src/utils/response';
import { COMPANY_ID } from '#src/config/index';
import Product from '#src/schemas/product';
import ProductOptionGroup from '#src/schemas/productOptionGroup';
import ProductOption from '#src/schemas/productOption';

export const find = async (req, res) => {
  try {
    const products = await Product.find({ company: COMPANY_ID }).populate({
      path: 'options',
      populate: {
        path: 'options',
        populate: {
          path: 'option'
        }
      }
    });
    return res.status(200).json(OK(products));
  } catch (error) {
    return res.status(500).json(INTERNAL_SERVER_ERROR(error.message));
  }
};

export const create = async (req, res) => {
  try {
    const product = req.body;
    const { options: productOptionGroups } = product;
    let productOptionGroupsIds = [];
    if (productOptionGroups && productOptionGroups.length > 0) {
      for (const productOptionGroup of productOptionGroups) {
        const { _id, label, subOptions: productOptions } = productOptionGroup;
        if (!_id) {
          let subOptions = [];
          if (productOptions && productOptions.length > 0) {
            for (const productOption of productOptions) {
              if (!productOption?._id) {
                return res
                  .status(400)
                  .json(BAD_REQUEST('The product option id is required'));
              }
              const savedProductOption = await ProductOption.create({
                option: productOption._id,
                aditionalPrice: productOption.aditionalPrice,
                order: productOption.order
              });
              subOptions.push(savedProductOption._id);
            }
          }
          const savedProductOptionGroup = await ProductOptionGroup.create({
            label,
            options: subOptions
          });
          productOptionGroupsIds.push(savedProductOptionGroup?._id);
        }
      }
    }
    const savedProduct = await Product.create({
      ...product,
      options: productOptionGroupsIds
    });
    return res.status(200).json(OK(savedProduct));
  } catch (error) {
    return res.status(500).json(INTERNAL_SERVER_ERROR(error.message));
  }
};

export const remove = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedProduct = await Product.findById(id);
    if (!deletedProduct) {
      return res.status(400).json(BAD_REQUEST('The product does not exist'));
    }
    await deletedProduct.deleteOne();
    return res.status(200).json(OK(deletedProduct));
  } catch (error) {
    return res.status(500).json(INTERNAL_SERVER_ERROR(error.message));
  }
};
