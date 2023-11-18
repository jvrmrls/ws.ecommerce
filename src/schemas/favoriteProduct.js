import mongoose, { Schema } from 'mongoose';
import { COMPANY_ID } from '#src/config/index';

const FavoriteProductSchema = new Schema(
  {
    product: {
      type: Schema.Types.ObjectId,
      ref: 'Product',
      required: true
    },
    uid: {
      type: String,
      required: true
    },
    company: {
      type: Schema.Types.ObjectId,
      ref: 'Company'
    },
    date: {
      type: Date,
      default: Date.now
    }
  },
  {
    timestamps: true,
    versionKey: false
  }
);

FavoriteProductSchema.pre('save', function (next) {
  if (!this.company) this.company = COMPANY_ID;
  next();
});

export default mongoose.model('FavoriteProduct', FavoriteProductSchema);
