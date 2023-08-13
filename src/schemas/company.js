import mongoose, { Schema } from 'mongoose';

const CompanySchema = new Schema(
  {
    name: {
      type: String,
      required: true
    },
    description: {
      type: String,
      default: ''
    }
  },
  {
    timestamps: true,
    versionKey: false
  }
);

export default mongoose.model('Company', CompanySchema);
