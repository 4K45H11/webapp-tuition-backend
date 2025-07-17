const jwt = require('jsonwebtoken')

exports.generateAccessToken = (user)=>{
    return jwt.sign(
        {id:user._id,role:user.role},
        process.env.JWT_SECRET,
        {expiresIn: '1h'}
    )
}

exports.generateRefreshToken = (user)=>{
    return jwt.sign(
        {id:user._id},
        process.env.JWT_REFRESH_SECRET,
        {expiresIn: '1d'}
    )
}