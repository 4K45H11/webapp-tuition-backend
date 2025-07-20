const User = require('../models/User.model')
const Test = require('../models/Test.model')
const Payment = require('../models/Payment.model')
const Doubt = require('../models/Doubt.model')

exports.getAdminOverView = async (req, res) => {
    try {
        const studentCount = await User.countDocuments({ role: 'student' })
        const testCount = await Test.countDocuments()
        const paymentCount = await Payment.countDocuments()

        //aggregate function
        const totalRevenue = await Payment.aggregate([
            { $match: { status: 'paid' } },
            { $group: { _id: null, total: { $sum: "$amount" } } }
        ])

        const doubtStats = await Doubt.aggregate([
            {
                $group: {
                    _id: '$status',
                    count: { $sum: 1 }
                }
            }
        ]);

        const doubtSummary = {
            pending: 0,
            answered: 0
        }

        doubtStats.forEach((d) => {
            doubtSummary[d._id] = d.count
        })

        res.status(200).json({
            students: studentCount,
            tests: testCount,
            payments: paymentCount,
            totalRevenue: totalRevenue[0]?.total || 0,
            doubts: doubtSummary
        });
    } catch (error) {
        res.status(500).json({ message: 'Failed to load admin overview', error: err.message });
    }
}