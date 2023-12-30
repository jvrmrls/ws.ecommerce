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
    const deletePromises = this.options.map(async (option) => {
      const deletedCartDetailOption = await CartDetailOption.findById(option);
      if (deletedCartDetailOption) {
        return deletedCartDetailOption.deleteOne();
      }
    });
    await Promise.all(deletePromises);
    next();
  }
);

CartDetailSchema.pre(
  'deleteMany',
  { document: false, query: true },
  async function (next) {
    const cartDetails = await this.model.find(this.getFilter());
    for (const cartDetail of cartDetails) {
      const deletePromises = cartDetail.options.map(async (option) => {
        const deletedCartDetailOption = await CartDetailOption.findById(option);
        if (deletedCartDetailOption) await deletedCartDetailOption.deleteOne();
      });
      await Promise.all(deletePromises);
    }
    next();
  }
);

export default model('CartDetail', CartDetailSchema);
