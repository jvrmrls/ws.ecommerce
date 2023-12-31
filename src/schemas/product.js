import { Schema, model } from 'mongoose';
import ProductOptionGroup from '#src/schemas/productOptionGroup';
import { COMPANY_ID } from '#src/config/index';

const ProductSchema = new Schema(
  {
    name: {
      type: String,
      required: true
    },
    description: {
      type: String,
      default: ''
    },
    price: {
      type: Number,
      required: true
    },
    order: {
      type: Number,
      default: -1
    },
    isActive: {
      type: Boolean,
      default: true
    },
    isNew: {
      type: Boolean,
      default: false
    },
    urlName: {
      type: String,
      default: ''
    },
    category: {
      type: Schema.Types.ObjectId,
      ref: 'Category',
      required: true
    },
    tags: [
      {
        type: String,
        default: ''
      }
    ],
    company: {
      type: Schema.Types.ObjectId,
      ref: 'Company'
    },
    options: [
      {
        type: Schema.Types.ObjectId,
        ref: 'ProductOptionGroup'
      }
    ]
  },
  {
    timestamps: true,
    versionKey: false
  }
);

ProductSchema.pre('save', function (next) {
  this.company = COMPANY_ID;
  next();
});

ProductSchema.pre(
  'deleteOne',
  { document: true, query: false },
  async function (next) {
    await ProductOptionGroup.deleteMany({ _id: { $in: this.options } });
    // for (const option of this.options) {
    //   const deletedProductOptionGroup = await ProductOptionGroup.findById(
    //     option
    //   );
    //   await deletedProductOptionGroup.deleteOne();
    // }
    next();
  }
);

export default model('Product', ProductSchema);
