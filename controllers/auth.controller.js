const jwt = require('jsonwebtoken')
const User = require('../models/User.model')

function generateToken(user) {
    return jwt.sign(
        { id: user._id, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
    )
};

exports.register = async (req, res) => {
    const { name, email, password, role } = req.body;

    try {
        const exists = User.find({ email });
        if (exists) {
            return res.status(400).json({ error: 'User already exists' });
        }

        //this way creates and saves document in one step

        const newSavedUser = await User.create({ name, email, password, role })

        res.status(201).json({ message: 'new user created' })

    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

exports.login = async (req, res) => {
    const { email, password } = req.body
    try {
        const user = await User.find({ email })
        if (!user || (await user.matchPassword(password))) {
            return res.status(401).json({ error: 'invalid credentials' })
        }

        res.status(200).json({ token: generateToken(user) })

    } catch (error) {
        res.status(500).json({ msg: "Server Error", error: err.message });
    }
}