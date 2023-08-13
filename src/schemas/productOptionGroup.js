import { model, Schema } from 'mongoose';
import ProductOption from '#src/schemas/productOption';

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
    for (const option of this.options) {
      const deletedProductOption = ProductOption.findById(option);
      await deletedProductOption.deleteOne();
    }
    next();
  }
);

export default model('ProductOptionGroup', ProductOptionGroupSchema);
