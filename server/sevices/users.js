const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/User');

const blacklist = new Set();

const JWT_SECRET = 't gcsergcserg  b920n3w4pc[w3tcawert6v9';

async function register(username, password) {
    // check if user exists
    const existing = await User.findOne({ username });

    if (existing) {
        throw new Error('User with this username already exists in the database');
    }

    // hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // store user
    const user = new User({
        username,
        hashedPassword
    });

    await user.save();

    return createToken(user);
}

async function login(username, password) {
    // check if user exists
    const user = await User.findOne({ username });

    if (!user) {
        throw new Error('Incorrect username or password');
    }

    // verify password
    const match = await bcrypt.compare(password, user.hashedPassword);

    if (!match) {
        throw new Error('Incorrect username or password');
    }

    return createToken(user);
}

function logout(token) {
    blacklist.add(token);
}

function createToken(user) {
    const payload = {
        _id: user._id,
        username: user.username
    };

    const accessToken = jwt.sign(payload, JWT_SECRET);

    return {
        _id: user._id,
        username: user.username,
        accessToken
    };
}

function validateToken(token) {
    if (blacklist.has(token)) {
        throw new Error('Token is blacklisted');
    }
    return jwt.verify(token, JWT_SECRET);
}

module.exports = {
    register,
    login,
    logout,
    validateToken,
};