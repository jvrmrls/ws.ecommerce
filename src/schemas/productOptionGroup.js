import { model, Schema } from 'mongoose';
import ProductOption from '#src/schemas/productOption';
import Product from '#src/schemas/product';

const ProductOptionGroupSchema = new Schema(
  {
    label: {
      type: String,
      required: true
    },
    options: [
      {
        type: Schema.Types.ObjectId,
        ref: 'ProductOption'
      }
    ]
  },
  {
    timestamps: true,
    versionKey: false
  }
);

ProductOptionGroupSchema.pre(
  'deleteOne',
  { document: true, query: false },
  async function (next) {
    const existingInProducts = await Product.find({
      'options': { $in: [this._id] }
    })
    if (existingInProducts.length > 0) {
      throw new Error('No se puede eliminar el grupo de opciones porque está siendo usado por un producto');
    }
    for (const option of this.options) {
      const deletedProductOption = ProductOption.findById(option);
      await deletedProductOption.deleteOne();
    }
    next();
  }
);

export default model('ProductOptionGroup', ProductOptionGroupSchema);
