const jwt = require('jsonwebtoken')
const User = require('../models/User.model')
const Token = require('../models/Token.model')

const { generateAccessToken, generateRefreshToken } = require('../util/token.util')



//helper function
const sendTokens = async (user, res) => {
    const refreshToken = generateRefreshToken(user);
    //save the refresh token in database
    await Token.create({ userId: user._id, token: refreshToken })

    res.cookie('refreshToken', refreshToken, {
        httpOnly: true,
        sameSite: "Strict",
        secure: false,//true in production time(https)
        maxAge: 24 * 60 * 60 * 1000
    })
    .json({ accessToken: generateAccessToken(user) })
}

exports.register = async (req, res) => {
    const { name, email, password, role } = req.body;

    try {
        const exists = await User.findOne({ email });
        if (exists) {
            return res.status(400).json({ error: 'User already exists' });
        }

        //this way creates and saves document in one step

        const newSavedUser = await User.create({ name, email, password, role })


        await sendTokens(newSavedUser, res)

    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

exports.login = async (req, res) => {
    const { email, password } = req.body
    try {
        const user = await User.findOne({ email })
        if (!user || (await user.matchPassword(password))) {
            return res.status(401).json({ error: 'invalid credentials' })
        }

        await sendTokens(user, res)

    } catch (error) {
        res.status(500).json({ msg: "Server Error", error: err.message });
    }
}

exports.refreshToken = async (req, res) => {
    const token = req.cookies.refreshToken;
    if (!token) return res.status(401).json({ error: 'No refresh token' });

    const exists = await Token.findOne({ token })

    if (!exists) return res.status(403).json({ error: 'Token not found' });

    try {
        const decoded = jwt.verify(token, process.env.JWT_REFRESH_SECRET);

        const user = await User.findById(decoded.id);
        if(!user) throw new Error('Invalid token user')

        res.json({accessToken:generateAccessToken(user)})
    } catch (error) {
        res.status(403).json({error:error.message})
    };
}

exports.logout = async (req,res)=>{
    const token = req.cookies.refreshToken;
    if(token) await Token.findOneAndDelete({token})
    res.clearCookie("refreshToken").json({message:'Logged out'})
};