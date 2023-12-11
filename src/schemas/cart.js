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
    for (const product of this.menu) {
      const deletedProduct = await CartDetail.findById(product);
      await deletedProduct.deleteOne();
    }
    next();
  }
);

export default model('Cart', CartSchema);
