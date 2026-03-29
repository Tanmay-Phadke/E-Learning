const asyncHandler = require('express-async-handler');
const stripe = require('stripe');
const getStripe = () => stripe(process.env.STRIPE_SECRET_KEY);
const Order = require('../models/orderModel');
const User = require('../models/userModel');
const Course = require('../models/courseModel');

const createCheckoutSession = asyncHandler(async (req, res) => {
  const { courseId } = req.body;
  const course = await Course.findById(courseId);
  if (!course) {
    res.status(404);
    throw new Error('Course not found');
  }
  const session = await getStripe().checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: [{
      price_data: {
        currency: 'usd',
        product_data: { name: course.title, description: course.description, images: [course.thumbnail] },
        unit_amount: Math.round(course.price * 100),
      },
      quantity: 1,
    }],
    mode: 'payment',
    success_url: `${process.env.CLIENT_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${process.env.CLIENT_URL}/cancel`,
    metadata: { userId: req.user._id.toString(), courseId: course._id.toString() },
  });
  res.json({ id: session.id, url: session.url });
});

const verifyPayment = asyncHandler(async (req, res) => {
  const { sessionId } = req.body;
  const session = await getStripe().checkout.sessions.retrieve(sessionId);
  if (session.payment_status === 'paid') {
    const { userId, courseId } = session.metadata;
    const existingOrder = await Order.findOne({ paymentId: sessionId });
    if (!existingOrder) {
      const order = await Order.create({ user: userId, course: courseId, paymentId: sessionId, amountPaid: session.amount_total / 100 });
      const user = await User.findById(userId);
      if (!user.enrolledCourses.includes(courseId)) {
        user.enrolledCourses.push(courseId);
        await user.save();
      }
      res.status(201).json({ message: 'Success', order });
    } else {
      res.json({ message: 'Success', existingOrder });
    }
  } else {
    res.status(400);
    throw new Error('Payment not verified');
  }
});

module.exports = { createCheckoutSession, verifyPayment };
