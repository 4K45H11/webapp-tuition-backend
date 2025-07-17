const Test = require('../models/Test.model')
const Submission = require('../models/Submission.model')

exports.createTest = async (req, res) => {
    try {
        const test = await Test.create({
            ...req.body,
            createdBy: req.user.id,
        });

        res.status(201).json(test);

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

exports.updateTest = async (req, res) => {
    try {
        const test = await Test.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(test);
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

exports.deleteTest = async (req, res) => {
    try {
        await Test.findByIdAndDelete(req.params.id);
        res.json({ message: "Test Deleted" });
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

exports.getAllTests = async (req, res) => {
    try {
        const tests = await Test.find().select("title duration isPaid");

        res.json(tests);

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getTestById = async (req, res) => {
    try {
        const test = await Test.findById(req.params.id).lean()

        //removes correct index from test questions
        test.questions.forEach((q) => delete q.correctIndex)

        res.json(test)

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

//submit test controller

exports.submitTest = async (req, res) => {
    try {
        const test = await Test.findById(req.params.id)

        //this will come from radio button options
        const answers = req.body.selectedAnswers;

        //this will come from frontend(browser timer)
        // {
        //     "selectedAnswers": [1, 0, 2, 3],
        //         "timeTaken": 480
        // }
        const timeTaken = req.body.timeTaken || 0;

        let right = 0;
        test.questions.forEach((q, index) => {
            if (q.correctIndex === answers[index]) right++
        })

        const total = test.questions.length;
        const wrong = total - right
        const accuracy = ((right / total) * 100).toFixed(2)

        const existing = await Submission.findOne({
            test:test._id,
            student:req.user.id
        })

        const result = await Submission.create({

            test: test._id,
            student: req.user.id,
            selectedAnswers: answers,
            score: right,
            total,
            right,
            wrong,
            accuracy,
            timeTaken,

            //check and let ranking ability for first 
            // attempt only

            isRanked: !existing
        })

        res.json({
            message: "Submitted",
            firstAttempt:!existing,
            score: right,
            right,
            wrong,
            accuracy,
            total
        })

    } catch (error) {
        res.status(500).json({ error: err.message });
    }
}


exports.getResult = async(req,res)=>{
    try {
        const result = await Submission.findOne({
            test: req.params.id,
            student: req.user.id,
        });

        if(!result) return res.status(404).json({error:"No submission found"})
        
            res.json({
                testId: result.test,
                score: result.score,
                total: result.total,
                right : result.right,
                wrong : result.wrong,
                accuracy: result.accuracy,
                timeTaken: result.timeTaken,
                submittedAt : result.submittedAt
            })
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

exports.getGlobalRanking = async(req,res)=>{
    try {
        const rankings = await Submission.findOne({
            test:req.params.id,
            isRanked: true
        }).sort({score: -1,timeTaken:1})
         //high score and fast
         .populate("student","name email")

        res.json(rankings)

    } catch (error) {
        res.status(500).json({error:error.message});
    }
}
