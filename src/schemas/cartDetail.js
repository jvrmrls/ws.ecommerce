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
    await CartDetailOption.deleteMany({ cartDetail: this._id });
    next();
  }
);

CartDetailSchema.pre(
  'deleteMany',
  { document: false, query: true },
  async function (next) {
    const cartDetails = await this.model.find(this.getFilter());
    await CartDetailOption.deleteMany({ cartDetail: { $in: cartDetails } });
    next();
  }
);

export default model('CartDetail', CartDetailSchema);
