import { model, Schema } from 'mongoose';
import { COMPANY_ID } from '#src/config/index';

const AddressSchema = new Schema(
  {
    name: {
      type: String,
      required: true
    },
    longitute: {
      type: Number,
      required: true
    },
    latitude: {
      type: Number,
      required: true
    },
    reference: {
      type: String,
      default: ''
    },
    uid: {
      type: String,
      required: true
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

AddressSchema.pre('save', function (next) {
  this.company = COMPANY_ID;
  next();
});

export default model('Address', AddressSchema);
