import { model, Schema } from 'mongoose';
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
    cartName: {
      type: String,
      required: true
    },
    isActive: {
      type: Boolean,
      default: true
    },
    company: {
      type: Schema.Types.ObjectId,
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

export default model('Option', OptionSchema);
