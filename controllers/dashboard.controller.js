const Submission = require('../models/Submission.model')

exports.getStudentDashboard = async(req,res)=>{
    const submissions = await Submission.find({student: req.user.id})
    .populate("TutionTest","title")
    .sort({submittedAt : -1})

    res.json({submissions})
}