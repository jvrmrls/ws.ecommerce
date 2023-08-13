import { model, Schema } from 'mongoose';

const ProductOptionSchema = new Schema(
  {
    option: {
      type: Schema.Types.ObjectId,
      ref: 'Option'
    },
    aditionalPrice: {
      type: Number,
      default: 0
    },
    order: {
      type: Number,
      default: -1
    }
  },
  {
    timestamps: true,
    versionKey: false
  }
);

export default model('ProductOption', ProductOptionSchema);
