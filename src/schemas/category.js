import mongoose, { Schema } from 'mongoose';
import { COMPANY_ID } from '#src/config/index';

const CategorySchema = new Schema(
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

CategorySchema.pre('save', function (next) {
  this.company = COMPANY_ID;
  next();
});

export default mongoose.model('Category', CategorySchema);
