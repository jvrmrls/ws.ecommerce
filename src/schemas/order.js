import { Schema, model } from 'mongoose';
import { COMPANY_ID } from '#src/config/index';

const OrderSchema = new Schema({
  date: {
    type: Date,
    default: Date.now
  },
  cart: {
    type: Schema.Types.ObjectId,
    ref: 'Cart',
    default: null
  },
  address: {
    type: String,
    required: true
  },
  uid: {
    type: String,
    default: ''
  },
  email: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    default: ''
  },
  name: {
    type: String,
    required: true
  },
  comment: {
    type: String,
    default: ''
  },
  paymentMethod: {
    type: String,
    enum: ['CASH', 'CREDIT_CARD'],
    default: null
  },
  paymentStatus: {
    type: String,
    enum: ['PENDING', 'PAID', 'CANCELLED'],
    default: 'PENDING'
  },
  status: {
    type: String,
    enum: ['PENDING', 'PREPARING', 'READY', 'DELIVERING', 'DELIVERED', 'CANCELLED'],
    default: 'PENDING'
  },
  company: {
    type: Schema.Types.ObjectId,
    ref: 'Company'
  }
}, {
  timestamps: true,
  versionKey: false
});

OrderSchema.pre('save', function (next) {
  if (!this.company) this.company = COMPANY_ID;
  if(!this.date) this.date = Date.now;
  next();
});

export default model('Order', OrderSchema);