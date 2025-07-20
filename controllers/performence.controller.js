const Submission = require('../models/Submission.model')

exports.getStudentPerformence = async (req, res) => {
    const studentId = req.params.studentId;
    try {
        const submissions = await Submission.find({ student: studentId })

        //check if it is an empty array
        if (!submissions.length) {
            return res.status(404).json({ error: 'No submission found' })
        }

        let totalRight = 0, totalWrong = 0, totalAccuracy = 0

        const chartData = []

        submissions.forEach((s) => {
            totalRight += s.right;
            totalWrong += s.wrong;
            totalAccuracy += s.accuracy;

            chartData.push({
                label: s.test || s._id.toString(),
                accuracy: s.accuracy,
                date : s.submittedAt
            })
        })

        const avgAccuracy = (totalAccuracy/submissions.length).toFixed(2)


        res.status(200).json({
            totalTests : submissions.length,
            totalRight,
            totalWrong,
            averageAccuracy: avgAccuracy,
            chartData
        })


    } catch (error) {
        res.status(500).json({ message: 'Error fetching performance', error: err.message });
    }
}