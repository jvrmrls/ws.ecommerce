import { model, Schema } from 'mongoose';
import CartDetailOption from '#src/schemas/cartDetailOption';

const CartDetailSchema = new Schema(
  {
    cart: {
      type: Schema.Types.ObjectId,
      ref: 'Cart'
    },
    product: {
      type: Schema.Types.ObjectId,
      ref: 'Product'
    },
    quantity: {
      type: Number,
      required: true
    },
    order: {
      type: Number,
      default: -1
    },
    options: [
      {
        type: Schema.Types.ObjectId,
        ref: 'CartDetailOption'
      }
    ]
  },
  {
    timestamps: true,
    versionKey: false
  }
);

CartDetailSchema.pre(
  'deleteOne',
  { document: true, query: false },
  async function (next) {
    for (const option of this.options) {
      const deletedCartDetailOption = await CartDetailOption.findById(option);
      await deletedCartDetailOption.deleteOne();
    }
    next();
  }
);

export default model('CartDetail', CartDetailSchema);
