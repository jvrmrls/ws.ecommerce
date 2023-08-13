import mongoose, { Schema } from 'mongoose';
import { COMPANY_ID } from '#src/config/index';

const OptionSchema = new Schema(
  {
    name: {
      type: String,
      required: true
    },
    description: {
      type: String,
      default: ''
    },
    isActive: {
      type: Boolean,
      default: true
    },
    company: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Company',
      required: true
    }
  },
  {
    timestamps: true,
    versionKey: false
  }
);

OptionSchema.pre('save', function (next) {
  this.company = COMPANY_ID;
  next();
});

export default mongoose.model('Option', OptionSchema);
