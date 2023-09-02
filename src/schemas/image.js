import { model, Schema } from 'mongoose';
import { COMPANY_ID } from '#src/config/index';

const ImageSchema = new Schema(
  {
    type: {
      type: String,
      required: true
    },
    extension: {
      type: String,
      required: true
    },
    size: {
      type: String,
      required: true
    },
    reference: {
      type: String,
      required: true
    },
    url: {
      type: String
    },
    key: {
      type: String
    },
    height: {
      type: Number
    },
    width: {
      type: Number
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

ImageSchema.pre('save', function (next) {
  if (!this.company) this.company = COMPANY_ID;
  next();
});

export default model('Image', ImageSchema);
