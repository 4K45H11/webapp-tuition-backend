const jwt = require('jsonwebtoken')

exports.protect = (req, res, next) => {

    const token = req.header.authorization?.split(' ')[1]
    if (!token) return res.status(401).json({ error: 'no token access denied' });

    try {

        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        req.user = decoded;
        next();

    } catch (error) {
        res.status(401).json({error:'Invalid token'})
    }

}

exports.authorizeAdmin= (req,res,next)=>{
    if(req.user.role !== 'admin') return res.status(403).json({error:'admin only'})

    next();
}

exports.aurhorizeStudent = (req,res,next)=>{
    if(req.user.role !== 'student') return res.status(403).json({error: 'student only'})

    next();
}