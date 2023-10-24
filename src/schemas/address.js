import { model, Schema } from 'mongoose';
import { COMPANY_ID } from '#src/config/index';

const AddressSchema = new Schema(
  {
    name: {
      type: String,
      required: true
    },
    longitude: {
      type: Number,
      required: true
    },
    latitude: {
      type: Number,
      required: true
    },
    street: {
      type: String,
      required: true
    },
    houseNumber: {
      type: String,
      required: true
    },
    reference: {
      type: String,
      default: ''
    },
    isPrimary: {
      type: Boolean,
      default: false
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
