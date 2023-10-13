import { model, Schema } from 'mongoose';
import { COMPANY_ID } from '#src/config/index';

const PreferenceSchema = new Schema(
  {
    code: {
      type: String,
      required: true
    },
    value: [
      {
        type: Schema.Types.Mixed,
        required: true
      }
    ],
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

PreferenceSchema.pre('save', function (next) {
  this.company = COMPANY_ID;
  next();
});

export default model('Preference', PreferenceSchema);
