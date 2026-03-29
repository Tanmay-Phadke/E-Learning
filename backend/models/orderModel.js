const mongoose = require('mongoose');

const orderSchema = mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
    course: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Course' },
    paymentId: { type: String, required: true },
    amountPaid: { type: Number, required: true },
    status: { type: String, required: true, default: 'Paid' },
  },
  { timestamps: true }
);

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
