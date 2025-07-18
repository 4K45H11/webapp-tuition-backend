const Doubt = require('../models/Doubt.model')

exports.askDoubt = async(req,res)=>{
    const doubt = await Doubt.create({
        student: req.use.id,
        question:req.body.question
    });

    res.status(201).json(doubt);
};

exports.answerDoubt = async(req,res)=>{
    const doubt = await Doubt.findByIdAndUpdate(req.params.id,
        {
            answer:req.body.answer,
            answeredAt: new Date()
        },
        {new:true}
    );

    res.json(doubt)
};

exports.getAllDoubts = async(req,res)=>{
    const doubts = await Doubt.find().populate("student", "name email")

    res.json(doubts)
};

exports.getStudentDoubts = async(req,res)=>{
    const doubts = await Doubt.find({student:req.user.id});
    res.json(doubts)
};
