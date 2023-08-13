import { model, Schema } from 'mongoose';

const CartDetailOptionSchema = new Schema(
  {
    cartDetail: {
      type: Schema.Types.ObjectId,
      ref: 'CartDetail'
    },
    option: {
      type: Schema.Types.ObjectId,
      ref: 'ProductOption'
    },
    selected: {
      type: Schema.Types.ObjectId,
      ref: 'ProductSubOption'
    }
  },
  {
    timestamps: true,
    versionKey: false
  }
);

export default model('CartDetailOption', CartDetailOptionSchema);
