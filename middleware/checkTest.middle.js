const TutionPayment = require('../models/Payment.model');
const TutionTest = require('../models/Test.model');

exports.checkTestAccess = async (req, res, next) => {
  const test = await TutionTest.findById(req.params.id);
  if (!test) return res.status(404).json({ message: 'Test not found' });

  if (!test.isPaid) return next(); // Free test

  const paid = await TutionPayment.findOne({
    student: req.user._id,
    test: test._id,
    status: "paid"
  });

  if (!paid) {
    return res.status(403).json({ message: 'Payment required to access this test' });
  }

  next();
};
