import mongoose, { Schema } from 'mongoose';
import { COMPANY_ID } from '#src/config/index';

const ShopSchema = new Schema(
  {
    name: {
      type: String,
      required: true
    },
    description: {
      type: String,
      default: ''
    },
    latitude: {
      type: Number,
      required: true
    },
    longitude: {
      type: Number,
      required: true
    },
    city: {
      type: String,
      required: true
    },
    isActive: {
      type: Boolean,
      default: true
    },
    company: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Company'
    }
  },
  {
    timestamps: true,
    versionKey: false
  }
);

ShopSchema.pre('save', function (next) {
  this.company = COMPANY_ID;
  next();
});

export default mongoose.model('Shop', ShopSchema);
