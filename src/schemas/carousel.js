import { model, Schema } from 'mongoose';
import { COMPANY_ID } from '#src/config/index';

const CarouselSchema = new Schema(
  {
    redirection: {
      type: String,
      enum: ['PRD', 'CAT'],
      required: true
    },
    reference: {
      type: String,
      required: true
    },
    order: {
      type: Number
    },
    isActive: {
      type: Boolean,
      default: true
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

CarouselSchema.pre('save', async function (next) {
  if (!this.company) this.company = COMPANY_ID;
  const carousel = await this.constructor
    .findOne({ company: COMPANY_ID })
    .sort({
      order: -1
    })
    .limit(1);
  if (carousel) this.order = carousel.order + 1;
  else this.order = 1;
  console.log(this.order, carousel);
  next();
});

export default model('Carousel', CarouselSchema);
