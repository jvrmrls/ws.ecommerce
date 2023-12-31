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
    await CartDetail.deleteMany({ cart: this._id });
    next();
  }
);

CartSchema.pre(
  'deleteMany',
  { document: false, query: true },
  async function (next) {
    await CartDetail.deleteMany({ cart: { $in: this.getFilter()._id } });
    next();
  }
);

export default model('Cart', CartSchema);
