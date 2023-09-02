import { Schema, model } from 'mongoose';
import { COMPANY_ID } from '#src/config/index';

const messageSchema = new Schema(
  {
    text: {
      type: String,
      required: true
    },
    startHour: {
      type: String,
      default: '00:00'
    },
    endHour: {
      type: String,
      default: '23:59'
    },
    days: {
      type: [String],
      default: ['LU', 'MA', 'MI', 'JU', 'VI', 'SA', 'DO']
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
    versionKey: false,
    toJSON: {
      transform: function (doc, ret) {
        delete ret.createdAt;
        delete ret.updatedAt;
        delete ret.company;
      }
    }
  }
);

messageSchema.pre('save', function (next) {
  if (!this.company) this.company = COMPANY_ID;
  next();
});

export default model('Message', messageSchema);
