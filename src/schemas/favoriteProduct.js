import mongoose, { Schema } from 'mongoose';

const FavoriteProductSchema = new Schema(
  {
    product: {
      type: Schema.Types.ObjectId,
      ref: 'Product',
      required: true
    },
    uid: {
      type: String,
      required: true
    },
    date: {
      type: Date,
      default: Date.now
    }
  },
  {
    timestamps: true,
    versionKey: false
  }
);

export default mongoose.model('FavoriteProduct', FavoriteProductSchema);
