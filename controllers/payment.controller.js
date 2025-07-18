const razorpay = require('../utils/razorpay')
const crypto = require('crypto')

const TutionPayment = require('../models/Payment.model')
const TutionTest = require('../models/Test.model')

//createing razorpay order

exports.createOrder = async (req, res) => {
    try {
        const { testId } = req.body

        const test = await TutionTest.findById(testId)
        if (!test || !test.isPaid) {
            return res.status(400).json({ message: 'Test not found or is free.' })
        }

        const amount = test.price * 100 //converting 
        // to paisa
        const options = {
            amount,
            currency: 'INR',
            receipt: `receipt_${Date.now()}`,
        }

        const order = await razorpay.orders.create(options)

        res.status(200).json({
            orderId: order.id,
            amount: order.amount,
            currency: order.currency,
            testId: test._id
        })



    } catch (error) {
        console.error("Error creating order:", error);
        res.status(500).json({ message: "Order creation failed" });
    }
}

//verify payment

exports.verifyPayment = async (req, res) => {
    try {
        const { razorpay_order_id,
            razorpay_payment_id,
            razorpay_signature,
            testId,
        } = req.body

        //signature verification

        const sign = razorpay_order_id + "|" + razorpay_payment_id;
        const expectedSignature = crypto.createHmac('sha256', process.env.RAZORPAY_SECRET)
            .update(sign)
            .digest('hex')

        if (expectedSignature !== razorpay_signature) {
            return res.status(400).json({ message: "Invalid signature" });
        }

        //save the payment to db

        const payment = await TutionPayment.create({
            student: req.user._id,
            test: testId,
            orderId: razorpay_order_id,
            paymentId: razorpay_payment_id,
            amount: req.body.amount,
            currency: req.body.currency || "INR",
            status: "paid",
        });

        res.status(200).json({ message: "Payment verified and recorded", payment })


    } catch (error) {
        console.error("Error verifying payment:", error);
        res.status(500).json({ message: "Payment verification failed" });
    }
}

