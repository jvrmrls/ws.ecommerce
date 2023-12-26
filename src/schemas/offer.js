import mongoose, { Schema } from 'mongoose';
import { COMPANY_ID } from '#src/config/index';

const OfferSchema = new Schema(
  {
    name: {
      type: String,
      default: ''
    },
    description: {
      type: String,
      default: ''
    },
    behavior: {
      type: String,
      enum: ['MNT', 'PRC'],
      required: true
    },
    amount: {
      type: Number,
      required: true
    },
    product: {
      type: Schema.Types.ObjectId,
      ref: 'Product'
    },
    from: {
      type: Date,
      required: true,
      default: Date.now
    },
    to: {
      type: Date,
      required: true
    },
    isActive: {
      type: Boolean,
      default: true
    },
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

OfferSchema.index({ product: 1, status: 1 }, { unique: true });

OfferSchema.pre('save', function (next) {
  this.company = COMPANY_ID;
  next();
});

export default mongoose.model('Offer', OfferSchema);
