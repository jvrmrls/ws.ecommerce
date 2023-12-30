import { model, Schema } from 'mongoose';
import { COMPANY_ID } from '#src/config/index';
import CartDetail from '#src/schemas/cartDetail';

const CartSchema = new Schema(
  {
    code: {
      type: String,
      required: true
    },
    status: {
      type: String,
      enum: ['ACT', 'INA', 'PAI', 'CAN'],
      default: 'ACT'
    },
    visibility: {
      type: String,
      enum: ['PUBLIC', 'PRIVATE'],
      default: 'PRI'
    },
    uid: {
      type: String,
      default: null
    },
    menu: [
      {
        type: Schema.Types.ObjectId,
        ref: 'CartDetail'
      }
    ],
    company: {
      type: Schema.Types.ObjectId,
      ref: 'Company'
    }
  },
  {
    timestamps: true,
    versionKey: false
  }
);

CartSchema.pre('save', function (next) {
  if (!this.company) this.company = COMPANY_ID;
  next();
});

CartSchema.pre(
  'deleteOne',
  { document: true, query: false },
  async function (next) {
    const deletePromises = this.menu.map(async (product) => {
      const deletedProduct = await CartDetail.findById(product);
      if (deletedProduct) {
        return deletedProduct.deleteOne();
      }
    });
    await Promise.all(deletePromises);
    next();
  }
);

CartSchema.pre(
  'deleteMany',
  { document: false, query: true },
  async function (next) {
    const carts = await this.model.find(this.getFilter());
    const deletePromises = carts.flatMap((cart) =>
      cart.menu.map(async (product) => {
        const deletedProduct = await CartDetail.findById(product);
        if (deletedProduct) {
          return deletedProduct.deleteOne();
        }
      })
    );
    await Promise.all(deletePromises);
    next();
  }
);

export default model('Cart', CartSchema);
