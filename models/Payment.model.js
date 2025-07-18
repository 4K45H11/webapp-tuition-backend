const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'TutionUser',
    required: true
  },
  test: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'TutionTest',
    required: true
  },
  orderId: {
    type: String, // razorpay order ID
    required: true
  },
  paymentId: {
    type: String, // razorpay payment ID
    required: true
  },
  amount: {
    type: Number, // amount in paisa
    required: true
  },
  currency: {
    type: String,
    default: 'INR'
  },
  status: {
    type: String,
    enum: ['created', 'paid', 'failed'],
    default: 'created'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('TutionPayment', paymentSchema);
